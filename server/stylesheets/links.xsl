<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <!-- If a table has only a single column, it isn't a table it's an info box!-->
    <xsl:template match="a">
      <xsl:if test="string-length(current()/text())> 0">
        <a href="{@href}">
          <xsl:apply-templates />
        </a>
      </xsl:if>
    </xsl:template>

</xsl:stylesheet>
