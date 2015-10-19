/*
 * This part is starting very first
 * Use it for loading eluminate.js 
 */

ibmweb.eluminate = {

	downloadTypes: ['bqy','doc','dot','exe','flv','jpg','png','mov','mp3','pdf','pps','ppt','rss','sh','swf','tar','txt','wmv','xls','xml','zip','avi','eps','gif','lwp','mas','mp4','pot','prz','rtf','wav','wma','123','odt','ott','sxw','stw','docx','odp','otp','sxi','sti','pptx','ods','ots','sxc','stc','xlsx'],
	domainList: ['.ibm.com', '.lotus.com', '.lotuslive.com', '.cognos.com', '.webdialogs.com', '.jazz.net', '.servicemanagementcenter.com','.xtify.com','.ibmcloud.com','.ibmdw.net','.bluemix.net','.smartercitiescloud.com'],

	// creating QueryString variable
	create_QueryString: function() {
		var query = window.location.search.substring(1);
		
		try {
			window.QueryString = dojo.queryToObject(query);
		} catch (e) {
			window.QueryString = {};
		}
	},

	domainTest: function(host) {
		if (host.length > 0) {
			host = host.toLowerCase();

			if (host == window.location.hostname.toLowerCase() || dojo.indexOf(this.domainList, host) !== -1) return true;

			for (var i = 0; i < this.domainList.length; i++) {
				if (host.search(this.domainList[i]) != -1) return true;
			}
		}
		return false;
	},

	match: function(pth) {
		var result = false,
			type = pth.substring(pth.lastIndexOf(".") + 1, pth.length);

		if (dojo.indexOf(this.downloadTypes, type) !== -1) result = true;

		return result;
	},

	pause: function(ms) {
		var date = new Date(),
			curDate = null;

		do curDate = new Date(); while(curDate - date < ms);
	},

	/*
	findElm: function(e, tag) {
			var elm = dojo.query(e.target || e.srcElement);

			if (typeof elm[0] === 'undefined') return null;

			while (elm[0].tagName.toLowerCase() !== tag) {
				if (elm.parent(tag).length == 1) elm = elm.parent(tag);
				else return elm;
			}
			return elm[0];
	},
	*/
	findElm: function(e, tag) {
		var elm = dojo.query(e.target || e.srcElement);

		if (typeof elm[0] === 'undefined') return null;

		elmNode = elm[0];

		var result = elmNode;
		
		while (typeof elmNode.parentNode !== 'undefined') {
			elmNode = elmNode.parentNode;
			if (elmNode == null) break;
			if (typeof elmNode.tagName !== 'undefined' && elmNode.tagName.toLowerCase() === tag) {result = elmNode; break}
		}

		return result;
	},
    
	download_and_offset_tracking: function(e) {

		if (typeof e == "undefined") return;

		var elm = this.findElm(e, 'a');

		if (typeof elm === 'undefined' || elm == null) return;

		//var pageid = (typeof(window.digitalData) !== "undefined" && typeof(window.digitalData.page) !== "undefined" && typeof(window.digitalData.page.pageID) !== "undefined")? window.digitalData.page.pageID : "";

		if ((typeof elm.tagName !== 'undefined' && elm.tagName.toLowerCase() == 'a') && !!elm.href) this.tracking_core(e, elm, 'normalClick');
	},
	
	left_click_tracking: function(e){
		var ev = (e.target)? e.target : ((e.srcElement)? e.srcElement : e.delegateTarget); //added to prevent duplicate element tag while ibmStats.event presents
		if (typeof ev !== 'undefined' || ev != null) {
			if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
			{ 
				var switcher = false;
				for (var att in ev.attributes)
				{	
					if (ev.attributes[att].name == 'onclick' && ev.attributes[att].value.indexOf('ibmStats.event') > -1 )
					{
						switcher = true;
						break;
					}
				}
				if (switcher != true) 
				{
					this.download_and_offset_tracking(e);
				}
			}
			else
			{
				var statsEvent = (ev.getAttribute("onclick") !== null) ? (ev.getAttribute("onclick").indexOf("ibmStats.event")) : -1;
				if(statsEvent === -1) 
				{
					this.download_and_offset_tracking(e);
				}

			}
		}
	}, 
	
	right_click_tracking: function(e) {

		if (typeof e == "undefined") return;
		
		var btn = e.which || e.button;

		if ((btn !== 1 ) || (navigator.userAgent.indexOf("Safari") !== -1)) {

			var elm = this.findElm(e, 'a');

			if (typeof elm === 'undefined' || elm == null) return;

			//var pageid = (typeof(window.digitalData) !== "undefined" && typeof(window.digitalData.page) !== "undefined" && typeof(window.digitalData.page.pageID) !== "undefined")? window.digitalData.page.pageID : "";

			if ((typeof elm.tagName !== 'undefined' && elm.tagName.toLowerCase() == 'a') && !!elm.href) this.tracking_core(e, elm, 'rightClick');
		}
	},
	
	//function to check if the link calls www megamenu or social toolbar
    check_megamenu_element : function(el){
		if (typeof (el) !== 'undefined'){
	    	do {
	    		if (el.id == "ibm-menu-links" || el.id == "ibm-common-menu" || el.id == "ibm-social-tools") {
	    	      	//(el.className == "ibm-media")
	    	      	return true;
	    	    }
	    		el = el.parentElement || el.parentNode;
	    	  } while ((el !== null) && (el.parentElement || el.parentNode))
		}
    	return false;
    },
	
	tracking_core: function(e, elm, type) { // for both click type

		var hostName = elm.hostname? (elm.hostname.split(":")[0]) : "",
			fullURL = escape(elm.href),
			qry = elm.search? elm.search.substring(elm.search.indexOf("?") + 1, elm.search.length) : "",
			p = dojo.queryToObject(qry),
			vparam = 'none',
			prtcl = elm.protocol || "",
			evAction = (elm.protocol == "ftp:")?  fullURL.substr(8) : ((elm.protocol == "https:") ? fullURL.substr(10) : fullURL.substr(9)),
			evid = (elm.protocol == "ftp:")?  elm.href.substr(6) : ((elm.protocol == "https:") ? elm.href.substr(8) : elm.href.substr(7)),
			evLinkTitle = (navigator.appVersion.indexOf("MSIE") != -1) ? elm.innerText : elm.textContent,
			pageid = "";
			
			//replace -_- from evAction if exists 
            if(evAction.indexOf('-_-') != -1){
            	evAction = evAction.replace(/-_-/g,"---");
            }

        if (typeof (window.digitalData) != "undefined" && typeof (window.digitalData.page) != "undefined" && typeof (window.pageViewAttributes) != "undefined") {
        	if(typeof (window.digitalData.page.pageInfo) != "undefined" && typeof (window.digitalData.page.pageInfo.pageID) != "undefined"){//for new DDO structure
        		pageid = window.digitalData.page.pageInfo.pageID;
        	}else if(typeof (window.digitalData.page.pageID) != "undefined"){
        		pageid = window.digitalData.page.pageID;
        	}
        	var currentdate = new Date(),
        		pageLocation = window.location.href.replace(/-_-/g,"---");
        	pageid = pageid + "-_--_--_-" + window.pageViewAttributes.split('-_-')[17] + "-_-" + pageLocation + "-_-" +  currentdate.getTime() + "-_-" + window.pageViewAttributes.split('-_-')[0];      
        }
		        
		if (typeof p.attachment !== 'undefined') vparam = p.attachment;
		if (typeof p.FILE !== 'undefined') vparam = p.FILE;
		if (typeof p.attachmentName !== 'undefined') vparam = p.attachmentName;

		var download_param = vparam.toLowerCase(),
			download_uri = elm.pathname.toLowerCase(),
			megamenuElement = this.check_megamenu_element(elm);

		if (evid.length > 50) evid = evid.substring(0,22) + "..." + evid.substring(evid.length - 25, evid.length);
		var optionalAttribute = evLinkTitle+'-_-null-_-null-_-null-_-'+evAction.toLowerCase()+'-_-'+evLinkTitle+'-_-null-_--_--_--_--_--_-'+pageid;
		//console.log(evid)

		// download_tracking and page_click
		if (megamenuElement == false && this.domainTest(hostName)) {

			if (this.match(download_uri) || this.match(download_param)) {
				var ttl = "",
					text = document.all? elm.innerText : elm.text,
					img = this.findElm(e, 'img'),
					coremetricsParam = '';

				if (img.alt) ttl = img.alt;
				else if (text) ttl = text;
				else if (elm.innerHTML) ttl = elm.innerHTML;

				if (vparam == "none") {
					
					coremetricsParam = evAction.toLowerCase() + '-_-' + optionalAttribute;
					
					if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'download', 'download'+ '-_-' + coremetricsParam);

					//this.pause(200);

				} else {

					coremetricsParam = download_param + '-_-' + optionalAttribute;
					
					if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(download_param, 'download', 'download'+ '-_-' + coremetricsParam);

					//this.pause(200);
				}

			} else {

				var pageClickParams = 'page click' + '-_-' + evAction + '-_-' + evLinkTitle + '-_-null-_-null-_-null-_-' + evAction.toLowerCase() + '-_-' + evLinkTitle + '-_-null-_-';

				pageClickParams += (typeof p.lnk !== 'undefined')? p.lnk + '-_-' : '-_-';
				pageClickParams += (typeof p.lm !== 'undefined')? p.lm + '-_-' : '-_-';
				pageClickParams += (typeof p.lot !== 'undefined')? p.lot + '-_-' : '-_-';
				pageClickParams += (typeof p.lsot !== 'undefined')? p.lsot + '-_-' : '-_-';

				if (typeof p.lpg !== 'undefined') pageClickParams += p.lpg;
				
				pageClickParams += '-_-' + pageid;

				if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'page click', pageClickParams);

				//this.pause(200);
			}
		}

		// offsite_tracking
		if (megamenuElement == false && ((hostName.length > 0) && (prtcl.indexOf("http") == 0 || prtcl.indexOf("mailto") == 0) && (!this.domainTest(hostName)))) {

			if (typeof cmCreateElementTag !== 'undefined') cmCreateElementTag(evid.toLowerCase(), 'external link', 'external link' + '-_-' + evAction + '-_-' + optionalAttribute);

			//this.pause(200);
		}
	},
	
	//Limit assignment of WTMSite from WTMCategory(specially for too many category Id in IWM page)
	checkRestrictCategory : function(wtmCategoryId){
		var selectedIWMCategory = ['GBS','GTS','STG','SWG','CSUITE','DW','ESD','IND','MID','MM','PPW','RATLE'];
		if(wtmCategoryId.indexOf('-') !== -1){
			var selectedPart = wtmCategoryId.split('-')[0];
    		for (var i = 0; i < selectedIWMCategory.length; i++) {
    			if (selectedPart.toUpperCase() === selectedIWMCategory[i]) {
    				return selectedPart;
    			}
    		}
		}
		return wtmCategoryId;
	},

	utilstatsHelper: function(e) {
		// check if builder has specified page title already
		if(!e.ibmEvLinkTitle && !e.ibmEvLinktitle){
			// no, so let's get it and add
			// get title of this page
			var h1Element = dojo.query('h1:first');
			if(h1Element.length > 0 && h1Element[0].innerHTML){
				// mixin with object provided by builder
				dojo.mixin(e, { 'ibmEvLinkTitle': h1Element[0].innerHTML });
			}
		}
		
		if (!e.ibmEvGroup) e.ibmEvGroup = 'null';
		if (!e.ibmEvName) e.ibmEvName = 'null';
		if (!e.ibmEvModule) e.ibmEvModule = 'null';
		if (!e.ibmEvSection) e.ibmEvSection = 'null';
		if (!e.ibmEvTarget) e.ibmEvTarget = 'null';
		if (!e.ibmEvFileSize) e.ibmEvFileSize = 'null';
		if (!e.ibmEvLinkTitle) e.ibmEvLinkTitle = 'null';

		// and now just call ibmStats.event()
		ibmStats.event(e);
	},
     
	init: function() {
		//if (window.location.href.indexOf('.ibm.com/support/servicerequest') >= 0) return;

		var _this = this,
			_conf = ibmweb.config.eluminate;

		_conf.enabled = true;

		// set QueryString
		this.create_QueryString();

		// set WebAnalitics
		if (typeof(window.WebAnalytics) == 'undefined') window.WebAnalytics = {Page: {PageIdentifier: window.location.href}};

		// set digitalData
		if (typeof(window.digitalData) == 'undefined') window.digitalData = {};

		// set siteID from meta IBM.WTMSite
		if (typeof _conf.siteID === "undefined") {_conf.siteID = String(dojo.query("meta[name='IBM.WTMSite']").attr("content"));}

		// set siteID from meta WTMSite
		if(_conf.siteID.length == 0) {_conf.siteID = String(dojo.query("meta[name='WTMSite']").attr("content"));}
		
		//set siteID from meta IBM.WTMCategory
        if (_conf.siteID.length == 0 && String(dojo.query("meta[name='IBM.WTMCategory']").attr("content")) != null ){
        	if (String(dojo.query("meta[name='IBM.WTMCategory']").attr("content")).substring(0, 5) == "SOFDC") {
        		_conf.siteID = "DEVWRKS";
        	}else{
        		_conf.siteID = this.checkRestrictCategory(String(dojo.query("meta[name='IBM.WTMCategory']").attr("content")));
        	}
        }
        
		// set siteID from digitalData siteID or categoryID
		if(_conf.siteID.length == 0 && typeof digitalData.page !== "undefined") {
			//for old DDO structure
			if (typeof digitalData.page.site !== "undefined" && typeof digitalData.page.site.siteID !== "undefined") {_conf.siteID = digitalData.page.site.siteID;}
			//for new DDO structure
			if (_conf.siteID.length == 0 && typeof digitalData.page.pageInfo !== "undefined" && typeof digitalData.page.pageInfo.ibm !== "undefined" && typeof digitalData.page.pageInfo.ibm.siteID !== "undefined") {
				_conf.siteID = digitalData.page.pageInfo.ibm.siteID;
	        }
			
			//for old DDO structure
			if (_conf.siteID.length == 0 && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.categoryID !== "undefined") {
				if (digitalData.page.category.categoryID.substring(0, 5) == "SOFDC") {
					_conf.siteID = "DEVWRKS";
            	}else{
            		_conf.siteID = this.checkRestrictCategory(digitalData.page.category.categoryID);
            	}
			}
			//for new DDO structure
			if (_conf.siteID.length == 0 && typeof digitalData.page.category !== "undefined" && typeof digitalData.page.category.primaryCategory !== "undefined") {
				if (digitalData.page.category.primaryCategory.substring(0, 5) == "SOFDC") {
					_conf.siteID = "DEVWRKS";
            	}else{
            		_conf.siteID = this.checkRestrictCategory(digitalData.page.category.primaryCategory);
            	}
			}       
		}
		//GBS site id change
    	if (window.location.href.toLowerCase().indexOf("935.ibm.com/services/") !== -1){
    		if ((window.location.pathname.toLowerCase().indexOf("/gbs/") !== -1) || (window.location.pathname.toLowerCase().indexOf("/business-consulting/") !== -1)){
    			_conf.siteID = "GBS";
    		}
    	}else if ((window.location.href.toLowerCase().indexOf("935.ibm.com/industries/") !== -1) || (window.location.href.toLowerCase().indexOf("06.ibm.com/industries/jp/") !== -1)){
    		_conf.siteID = "INDUSTRIES";
    	} 
		// set siteID on default value
		if(_conf.siteID.length == 0) {_conf.siteID = "IBMTESTWWW";}
		
		_conf.cmSetClientID.id = _conf.CID + "|" + _conf.siteID;
		
		// set cmTagQueue
		if (typeof(window.cmTagQueue) == 'undefined')  window.cmTagQueue = [];

		if(_conf.siteID == "ECOM"){
			window.cmTagQueue.push(['cmSetupNormalization', 'krypto-_-krypto']);	
		}
		//if the site id starts or ends with "test" set the client as 802
		if(_conf.siteID.substring(0, 4).toLowerCase() == "test" || _conf.siteID.substring(_conf.siteID.length-4, _conf.siteID.length).toLowerCase() == "test"){
			window.cmTagQueue.push(['cmSetClientID', '80200000|'+_conf.siteID, false, 'testdata.coremetrics.com', _conf.cmSetClientID.cookieDomain]);
		}else{
			window.cmTagQueue.push(['cmSetClientID', _conf.cmSetClientID.id, _conf.cmSetClientID.managedFirstParty, _conf.cmSetClientID.dataCollectionDomain, _conf.cmSetClientID.cookieDomain]);
		}
		window.cmTagQueue.push(['cmSetupOther', {"cm_JSFEAMasterIDSessionCookie": true}]);
		// cookie migration code for CLOUD EXCHANGE pages
		if ((_conf.siteID !== "undefined") && (_conf.siteID.toLowerCase() == "bluemix" || _conf.siteID.toLowerCase() == "cloudexchange" || _conf.siteID.toLowerCase() == "ecom")) {
			window.cmTagQueue.push(['cmSetupCookieMigration', true, true, this.domainList]);
		}

		// loading eluminate
		(function() {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', '//libs.coremetrics.com/eluminate.js');
			document.getElementsByTagName('head')[0].appendChild(script);
			
			window.loadingTime = new Date().getTime();
			window.eluminateLoaded = true;
		})();

		// coremetrics event functions
		dojo.addOnLoad(function(){
			if(_conf.siteID != "DWNEXT"){//to block event tracking for site id "DWNEXT"
				// for download and offset tracking
				//dojo.connect(dojo.body(),"onclick",ibmweb.eluminate,ibmweb.eluminate.download_and_offset_tracking);
				dojo.connect(dojo.body(), "onmousedown", function(e) {
	          		if ((typeof(e.which) !== 'undefined' && e.which == 1) || (typeof(e.button) !== 'undefined' && e.button == 0)) {
	          			_this.left_click_tracking(e);
	          		}
				});
				// for right click tracking
				dojo.connect(dojo.body(), "onmousedown", function(e) {
					if ((typeof(e.which) !== 'undefined' && e.which == 3) || (typeof(e.button) !== 'undefined' && e.button == 2)) _this.right_click_tracking(e);
				});
	
				// for middle click tracking
				dojo.connect(dojo.body(), "onmouseup", function(e) {
					if ((typeof(e.which) !== 'undefined' && e.which == 2) || (typeof(e.button) !== 'undefined' && e.button == 4)) _this.download_and_offset_tracking(e);
				});
			}
		});
	}
};

//if (ibmweb.config.config == 'www' && navigator.userAgent.toLowerCase().indexOf('msie') == -1) {
if (ibmweb.config.config == 'www') {

	if (navigator.platform.search('AIX') < 0) { // we disabling coremetrics for AIX server

		cmSetClientID = function(){};
		if (typeof(window.eluminate_enabled) !=='undefined') {
			// we search if this variable is set on false
			if (!window.eluminate_enabled) {/*do nothing*/}
			else ibmweb.eluminate.init();
		} else {
			// we are enabled for all pages
			ibmweb.eluminate.init();
		}

		/*var checkIbmStats = function(step) {
			var result = (typeof ibmStats !== 'undefined')? ibmStats : 0;

			if (step == 1 && result !== 0) {console.log('We find it'); step = 2;}

			if (step == 2) {
				if (typeof result.event === 'undefined') result = 0;
				else workWithIbmStats(result);
			}
			if (result == 0) setTimeout(function() { checkIbmStats(step) }, 100);
			
		},
		workWithIbmStats = function(_ibmStats) {
			console.log('NOW We CAN WORK WITH IBM STATS ', _ibmStats)
			dojo.ready(function() {
				_ibmStats.event = function(obj) {
					console.log('obj: ',obj.ibmEV)
				}
			});
		};

		checkIbmStats(1);*/
	}
}