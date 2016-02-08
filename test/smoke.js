module.exports = [
	// Health check
	{
		timeout: 10000,
		urls: {
			'/__health': 200
		}
	},
	{
		timeout: 10000,
		urls: {
			// not in CAPI (redirected to ft.com -> redirected to barrier)
			'/content/8f88c930-d00a-11da-80fb-0000779e2340': 'http://www.ft.com/cms/s/0/8f88c930-d00a-11da-80fb-0000779e2340.html?ft_site=falcon&desktop=true',
			// methode
			'/content/395650fa-5b9c-11e5-a28b-50226830d644': 200,
			// fastft
			'/content/b002e5ee-3096-3f51-9925-32b157740c98': 200,
			// podcast
			'/content/5cf687c7-ddb9-4243-8fea-69e50b6b5682': 200,
			// slideshow
			'/embedded-components/slideshow/593496fc-a4d5-11e5-97e1-a754d5d9538c': 200,
			// related fragments
			'/article/02cad03a-844f-11e4-bae9-00144feabdc0/story-package?articleIds=b56232bc-adec-11e4-919e-00144feab7de,8a5c2c02-a47e-11e4-b943-00144feab7de,6bfcdc6e-a0b6-11e4-8ad8-00144feab7de,c0dbd6d6-8072-11e4-9907-00144feabdc0': 200,
			'/article/02cad03a-844f-11e4-bae9-00144feabdc0/more-on?tagIds=TnN0ZWluX1BOX1BvbGl0aWNpYW5fMTY4OA==-UE4=,NDdiMzAyNzctMTRlMy00Zjk1LWEyZjYtYmYwZWIwYWU2NzAy-VG9waWNz&index=1': 200,
			// articles with not tagged with X
			'/article/02cad03a-844f-11e4-bae9-00144feabdc0/more-on?tagIds=TnN0ZWluX1BOX1BvbGl0aWNpYW5fMTY4OA==-UE4=,NDdiMzAyNzctMTRlMy00Zjk1LWEyZjYtYmYwZWIwYWU2NzAy-VG9waWNz&index=1': {
				content: ''
			}
		}
	},
	{
		// test access
		timeout: 10000,
		headers: {
			'X-FT-Access-Metadata': 'remote_headers'
		},
		urls: {
			// conditional standard article
			'/content/b30c8de4-4754-11e5-af2f-4d6e0e5eda22': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_standard'
				}
			},
			// unconditional article
			'/content/459ef70a-4a43-11e5-b558-8a9722977189': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'unconditional'
				}
			},
			// conditional premium article
			'/content/fe857b82-4add-11e5-9b5d-89a026fda5c9': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_premium'
				}
			},
			// fastft
			'/content/b002e5ee-3096-3f51-9925-32b157740c98': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_standard'
				}
			},
			// alphaville
			'/content/06d867f9-37d0-3ea8-965e-34043575e607': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_registered'
				}
			},
			// unconditional blog
			'/content/1be403ef-db18-38ad-b693-38913f3a1c24': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_standard'
				}
			},
			// conditional standard blog
			'/content/4b3f14b6-344e-11e5-bdbb-35e55cbae175': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_standard'
				}
			},
			// conditional registered blog
			'/content/a0c29efb-09a5-3ab4-a624-518d16c54c4b': {
				status: 200,
				headers: {
					'X-Ft-Content-Classification': 'conditional_registered'
				}
			}
		}
	}
];
