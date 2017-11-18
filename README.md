#sagr Atlasboard package

This is a package ready to be used with [Atlasboard](https://bitbucket.org/atlassian/atlasboard).

##Installation

From the root directory of your **recently created wallboard**, you just need to type:

    git submodule add https://github.com/saschagrebe/atlasboard-sagr-plugin.git

to import the package as **git submodule** and use any of the widgets and jobs in this package (check the example dashboard to see how).

See also: [https://bitbucket.org/atlassian/atlasboard/wiki/Package-Atlassian]()

## Available jobs/widgets

### Splunk job and widget

![Splunk widget](https://TODO)

Execute a on shot search against [Splunk](https://www.splunk.com/) server and display the result as a table.

Sample configuration:

	"splunk-search" : {
	    "interval": 60000,
	    "widgetTitle": "Severity Count",
	    "serverUrl": "localhost",
	    "username": "admin",
	    "password": "admin",
	    "scheme": "https",
	    "host": "localhost",
	    "port": "8089",
	    "version": "6.5",
	    "searchQuery": "search index=tree | stats count by \"Gattung_Art_Deutscher Name\" | sort count DESC | head 5"
	    searchParams : {
	        earliest_time: "2011-06-19T12:00:00.000-07:00",
	        latest_time: "2012-12-02T12:00:00.000-07:00"
	    }
    },

For details about parameter *searchQuery* and *searchParams* visit [http://dev.splunk.com/]().
