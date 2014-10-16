var FILTER_PARAM = 'filter';
var DATE_FILTER_NAME = 'initialPublishDateTime';


function setToMidnight(d){
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    return d;
}

function setToBeginningOfWeek(d){
    var day = d.getDay();
    d.setDate(d.getDate() - day);
    return setToMidnight(d);
}

function setToBeginningOfMonth(d){
    d.setDate(1);
    return setToMidnight(d);
}

function setToBeginningOfYear(d){
    d.setMonth(0,1);
    return setToMidnight(d);
}

function getDateConstantValue(name){
    var d = DateConstants[name];
    var isoString =  d.toISOString();
    return isoString.slice(0, isoString.length-5) + isoString.slice(isoString.length-1);
}

function datesAreEqual(date1, date2){
    return date1.getYear() === date2.getYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
}

function getDateConstantName(val){
    val = val.replace(new RegExp('[><]'), '');

    var date = new Date(val);
    for(var d in DateConstants){
        if(datesAreEqual(DateConstants[d], date)){
            return d;
        }
    }
}

var DateConstants = {
    'Today' : setToMidnight(new Date()),
    'This Week' : setToBeginningOfWeek(new Date()),
    'This Month' : setToBeginningOfMonth(new Date()),
    'This Year' : setToBeginningOfYear(new Date())
};

function Filter(name, value){
    this.name = name;
    this.value = value;
    this.title = [name[0].toUpperCase(), name.slice(1)].join('');
    this.isDate = name.indexOf('Date') > 1;
    this.text = value;
    this.removeurl = '';
}

Filter.prototype.toUrl = function toUrl(){
    return this.name + ':' + this.value;
};

function SearchFilters(req){
    this.path = req.path;
    this.query = (function(){
       var obj = {};
        Object.keys(req.query).forEach(function(key){
           if(key !== FILTER_PARAM){
               obj[key] = req.query[key];
           }
        });
        return obj;
    }());
    this.filters = this.parseFilterQuery(req.query[FILTER_PARAM]);
    this.addRemoveURLS();
}

SearchFilters.prototype.parseFilterQuery = function parseFilterQuery(q){
    var filters = [],
        searchFilters = this;

    if(!q){
        return filters;
    }

    q = decodeURI(q);
    q.split('AND').forEach(function(item){
        var name = item.slice(0, item.indexOf(':')).trim(),
            value = item.slice(item.indexOf(':')+1).trim(),
            filter = new Filter(name, value);

        if(filter.isDate){
            filter.title = 'Date';
            filter.text = getDateConstantName(value);
        }

        filters.push(filter);
    });

    return filters;
};

SearchFilters.prototype.hasFilterFor = function hasFilterFor(name){
    return this.filters.some(function(filter){
        return filter.name === name;
    });
};

SearchFilters.prototype.buildAPIQuery = function buildAPIQuery(){
    var query = this.query.q;
    var f = [];
    this.filters.forEach(function(filter){
        f.push(filter.name + ':' + filter.value);
    });

    return f.length ? query + ' AND ' + f.join(' AND ') : query;
};

SearchFilters.prototype.buildURL = function buildURL(f){
    var url = this.path + '?',
        queryParams = [],
        searchFilters = this;

    Object.keys(this.query).forEach(function(key){
       queryParams.push(key + '=' + searchFilters.query[key]);
    });

    url += (queryParams.join('&'));
    if(f){
        url += '&' + FILTER_PARAM + '=' + f;
    }

    return url;
};

SearchFilters.prototype.getURLWithout = function getURLWithout(filterName){
    var f = [];
    this.filters.forEach(function(filter){
        if(filter.name !== filterName ){
            f.push(filter.name + ':' + filter.value);
        }
    });

    return this.buildURL(f.join(' AND '));
};

SearchFilters.prototype.getURLWith = function(name, value){
    var f = [];
    this.filters.forEach(function(filter){
        f.push(filter.name + ':' + filter.value);
    });
    f.push(name + ':' + value);

    return this.buildURL(f.join(' AND '));
};

SearchFilters.prototype.addRemoveURLS = function addRemoveURLs(){
   var searchFilters = this;

    this.filters.forEach(function(filter){
       filter.removeurl = searchFilters.getURLWithout(filter.name);
    });
};

SearchFilters.prototype.getDateSearchFilters = function getDateSearchFilters(){
    var filters = [],
        searchFilters = this;

    Object.keys(DateConstants).forEach(function(key){
        if(!searchFilters.hasFilterFor.call(searchFilters, key)){
            filters.push({url : searchFilters.getURLWith(DATE_FILTER_NAME, '>' + getDateConstantValue(key) ), text:key});
        }
    });

    return filters;
}



/*
    STATIC METHODS / PROPERTIES
 */

SearchFilters.getDateConstants = function getDateConstants(){
    return DateConstants;
};

SearchFilters.getDateConstantValue = function getDateConstantValueStatic(name){
    return getDateConstantValue(name);
};

SearchFilters.FILTER_PARAM = FILTER_PARAM;

module.exports = SearchFilters;