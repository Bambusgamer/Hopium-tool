/* global google, InfoBubble, Vue */

Vue.config.devtools = true;

let vueApp;

function initMap() {
    console.log('init map');

    vueApp = new Vue({
        el: '#h2-map-container',
        data: {
            fullurl: 'https://my.h2.live/ceemes/',
            default_country: 'DE',
            api_token: 'b13831e6243b9bcd4c74aeda55c1fe22',
            language: 'de',
            operator: '',
            show_planned: true,
            show_eu: true,
            fueltype: '' == "P350_LARGE" ? "P350_LARGE" : "P700_SMALL",
            zoom: '6' != '0' ? parseInt('6') : 5,
            geolocationSupported: false,
            geolocation: { lat: 51.220915, lng: 9.357579 },
            markers: {},
            country_markers: {},
            positionmarker: null,
            infoBubble: null,
            stations: {},
            selectedStationIdx: null,
            selectedPaymenttype: {},
            loading: false,
            showLegend: false,
            debugMode: false,
            masterList: {},
            translations: {
                de: {
                    "search_field_placeholder": "Ort suchen",
                    "zukunft": "Zukunft",
                    "show_legend": "Legende",
                    "store-info-bold": "H2.LIVE",
                    "store-info": "die App für Emissionsfreifahrer:",
                    "h2-notice": "Wie Wasserstoff-Mobilität funktioniert erfahren Sie auf ",
                    "legend-headline": "Das bedeuten die Symbole\nauf der Karte",
                    "legend-headline-stations-ready": "H2-Tankstellen in Betrieb",
                    "legend-stations-ready-section1-headline": "Bereit / Technische Störung",
                    "legend-stations-ready-section1-descr": "Es kann getankt werden / Es kann nicht getankt werden",
                    "legend-stations-ready-section2-headline": "Informationen zur Verfügbarkeit beachten",
                    "legend-stations-ready-section2-descr": "",
                    "legend-stations-ready-section3-headline": "Keine Live-Informationen verfügbar",
                    "legend-stations-ready-section3-descr": "Bitte informieren Sie sich beim Betreiber, ob die Tankstelle bereit ist.",
                    "legend-stations-ready-section4-headline": "Tankstelle im Optimierungsbetrieb",
                    "legend-stations-ready-section4-descr": "Es kann getankt werden / Es kann nicht getankt werden",
                    "legend-stations-ready-section5-headline": "Dauerhaft geschlossen",
                    "legend-stations-ready-section5-descr": "",
                    "legend-headline-stations-planned": "H2-Tankstellen in Realisierung",
                    "legend-stations-planned-section1-headline": "Planungsphase",
                    "legend-stations-planned-section2-headline": "Genehmigungsphase",
                    "legend-stations-planned-section3-headline": "Ausführungsphase",
                    "legend-stations-planned-section4-headline": "Inbetriebnahme",
                    "legend-headline-stations-filter": "H2-Tankstellen filtern",
                    "legend-stations-filter-section1-headline": "Tankstellen in Realisierung  auf der Karte ein und ausblenden",
                    "legend-stations-filter-section2-headline1": "700 bar Tankstellen auf der Karte anzeigen",
                    "legend-stations-filter-section2-descr1": "Für Pkw und leichte Nutzfahrzeuge",
                    "legend-stations-filter-section2-headline2": "350 bar Tankstellen auf der Karte anzeigen",
                    "legend-stations-filter-section2-descr2": "Für Nutzfahrzeuge",
                    "betrieb": "eröffnet",
                    "realisierung": "In Realisierung",
                    "bar350_small": "350 bar für PKW",
                    "bar350_large": "350 bar für Nutzfahrzeuge",
                    "bar700_small": "700 bar",
                    "P350_LARGE": "350 bar",
                    "P700_SMALL": "700 bar",
                    "LBST_info_text": "Einen weltweiten Überblick zu öffentlichen und nicht-öffentlichen Tankstellen findet sich auf",
                    "feedback": "Feedback schreiben",
                    "feedback_headline": "Lob, Wünsche, Ärgernisse?",
                    "feedback_text_placeholder": "Ihr Feedback:*",
                    "feedback_email_placeholder": "Ihre E-Mail:*",
                    "feedback_disclaimer": "Ich bin damit einverstanden, dass Feedback und E-Mail-Adresse an den Betreiber übermittelt werden.",
                    "feedback_button_text": "Feedback senden",
                    "feedback_submitted": "Wir haben Ihre Nachricht erhalten. Vielen Dank.",
                    "h2_price": "H2 Preis:",
                    "call": "Anrufen:",
                    "currently_closed": "Außerhalb der Öffnungszeiten",
                    "funded_by": "Gefördert durch:",
                    "h2_costs_kg": "H2 Preis",
                    "implementation": "In Realisierung",
                    "latest": "Aktuelles:",
                    "live": "Bereit",
                    "no_live_status_info": "Keine Live-Informationen verfügbar",
                    "notice": "Hinweis:",
                    "opening": "Inbetriebnahme",
                    "operator": "Betreiber:",
                    "other_refuelling_types": "Weitere Betankungsarten:",
                    "technical_error": "Außer Betrieb",
                    "unlock_pay": "Freischalten/Bezahlen mit:",
                    "permanently_closed": "Dauerhaft geschlossen"
                },
                en: {
                    "search_field_placeholder": "Search location",
                    "zukunft": "Future",
                    "show_legend": "Legend",
                    "store-info-bold": "H2.LIVE",
                    "store-info": "For Clean Drivers:",
                    "h2-notice": "Find more information on hydrogen mobility on ",
                    "legend-headline": "What the symbols on the map mean",
                    "legend-headline-stations-ready": "H2 stations in operation",
                    "legend-stations-ready-section1-headline": "Live / Technical error",
                    "legend-stations-ready-section1-descr": "Refuelling is possible / Refuelling is not possible",
                    "legend-stations-ready-section2-headline": "Note information on availability",
                    "legend-stations-ready-section2-descr": "",
                    "legend-stations-ready-section3-headline": "Live information not available",
                    "legend-stations-ready-section3-descr": "Please contact the operator to check whether the H2 station is ready.",
                    "legend-stations-ready-section4-headline": "Station in trial operation phase",
                    "legend-stations-ready-section4-descr": "Refuelling is possible / Refuelling is not possible",
                    "legend-stations-ready-section5-headline": "Permanently closed",
                    "legend-stations-ready-section5-descr": "",
                    "legend-headline-stations-planned": "H2 stations in development",
                    "legend-stations-planned-section1-headline": "In planning",
                    "legend-stations-planned-section2-headline": "Approval phase",
                    "legend-stations-planned-section3-headline": "Execution phase",
                    "legend-stations-planned-section4-headline": "Trial operation phase",
                    "legend-headline-stations-filter": "H2 station filter",
                    "legend-stations-filter-section1-headline": "Show and hide H2 stations in development on the map",
                    "legend-stations-filter-section2-headline1": "Show 700 bar H2 stations on the map",
                    "legend-stations-filter-section2-descr1": "For passenger cars and light commercial vehicles",
                    "legend-stations-filter-section2-headline2": "Show 350 bar H2 stations on the map",
                    "legend-stations-filter-section2-descr2": "For commercial vehicles",
                    "betrieb": "opened",
                    "realisierung": "implementation",
                    "bar350_small": "350 bar for cars",
                    "bar350_large": "350 bar for heavy duty vehicles",
                    "bar700_small": "700 bar",
                    "P350_LARGE": "350 bar",
                    "P700_SMALL": "700 bar",
                    "LBST_info_text": "A global overview of public and non-public service stations can be found at",
                    "feedback": "Give feedback",
                    "feedback_headline": "Share your experiences",
                    "feedback_text_placeholder": "Your feedback:*",
                    "feedback_email_placeholder": "Your email:*",
                    "feedback_disclaimer": "I agree that feedback and e-mail address will be sent to the operator.",
                    "feedback_button_text": "Send Feedback",
                    "feedback_submitted": "We received your message. Thank you.",
                    "h2_price": "H2 price:",
                    "call": "Call:",
                    "currently_closed": "Outside business hours",
                    "funded_by": "Funded by:",
                    "h2_costs_kg": "H2 Price",
                    "implementation": "Implementation",
                    "latest": "Latest:",
                    "live": "Ready for use",
                    "no_live_status_info": "No live status information",
                    "notice": "Notice:",
                    "opening": "Opening",
                    "operator": "Operator:",
                    "other_refuelling_types": "Other refuelling options:",
                    "technical_error": "Out of service",
                    "unlock_pay": "Unlock/Pay with:",
                    "permanently_closed": "Permanently closed"
                }
            },
            showFeedbackForm: false,
            pw: "",
            username: "",
            feedbackSubmitted: false,
            feedbackError: "",
            feedbackText: "",
            feedbackEmail: "",
        },
        mounted() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    this.geolocationSupported = true;

                    // store position
                    this.geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                }.bind(this));
            }
            this.loadMasterlist();
            this.loadCountries();
            this.positionmarker = new google.maps.Marker({ backgroundClassName: 'markerLabel' });

            var styleJSON = JSON.parse('[\n  {\n    \"featureType\": \"administrative\",\n    \"stylers\": [\n      {\n        \"color\": \"#434343\"\n      },\n      {\n        \"visibility\": \"simplified\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"administrative\",\n    \"elementType\": \"labels\",\n    \"stylers\": [\n      {\n        \"color\": \"#aaaaaa\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"administrative\",\n    \"elementType\": \"labels.icon\",\n    \"stylers\": [\n      {\n        \"color\": \"#d6d6d6\"\n      },\n      {\n        \"visibility\": \"simplified\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"administrative.country\",\n    \"elementType\": \"geometry.stroke\",\n    \"stylers\": [\n      {\n        \"color\": \"#B4B4B4\"\n      },\n      {\n        \"visibility\": \"on\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"administrative.country\",\n    \"elementType\": \"labels\",\n    \"stylers\": [\n      {\n        \"color\": \"#d6d6d6\"\n      },\n      {\n        \"visibility\": \"off\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"landscape\",\n    \"stylers\": [\n      {\n        \"color\": \"#e3e3e3\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"landscape\",\n    \"elementType\": \"labels\",\n    \"stylers\": [\n      {\n        \"visibility\": \"simplified\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"landscape\",\n    \"elementType\": \"labels.icon\",\n    \"stylers\": [\n      {\n        \"color\": \"#ededed\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"poi\",\n    \"stylers\": [\n      {\n        \"visibility\": \"off\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"poi.park\",\n    \"stylers\": [\n      {\n        \"visibility\": \"on\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"poi.park\",\n    \"elementType\": \"labels\",\n    \"stylers\": [\n      {\n        \"visibility\": \"off\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road\",\n    \"stylers\": [\n      {\n        \"visibility\": \"on\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road\",\n    \"elementType\": \"geometry.stroke\",\n    \"stylers\": [\n      {\n        \"color\": \"#feffff\"\n      },\n      {\n        \"visibility\": \"simplified\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road\",\n    \"elementType\": \"labels\",\n    \"stylers\": [\n      {\n        \"visibility\": \"off\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road.highway\",\n    \"elementType\": \"geometry.fill\",\n    \"stylers\": [\n      {\n        \"color\": \"#feffff\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road.highway.controlled_access\",\n    \"elementType\": \"labels\",\n    \"stylers\": [\n      {\n        \"visibility\": \"on\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road.local\",\n    \"elementType\": \"geometry\",\n    \"stylers\": [\n      {\n        \"visibility\": \"simplified\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"road.local\",\n    \"elementType\": \"geometry.fill\",\n    \"stylers\": [\n      {\n        \"visibility\": \"simplified\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"transit\",\n    \"stylers\": [\n      {\n        \"visibility\": \"off\"\n      }\n    ]\n  },\n  {\n    \"featureType\": \"water\",\n    \"stylers\": [\n      {\n        \"color\": \"#c7e2f2\"\n      }\n    ]\n  }\n]');

            var mapOptions = {
                zoom: this.zoom,
                center: this.geolocation,
                navigationControl: true,
                mapTypeControl: false,
                scrollwheel: false,
                streetViewControl: false,
                scaleControl: false,
                fullscreenControl: false,
                zoomControl: false,
                styles: styleJSON,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.ZOOM_PAN,
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
            };

            this.map = new google.maps.Map(document.getElementById('h2-map'), mapOptions);

            google.maps.event.addListener(this.map, 'zoom_changed', function () {
                if (this.map.getZoom() != this.zoom) {
                    this.zoom = this.map.getZoom();
                }
            }.bind(this));

            this.infoBubble = new InfoBubble({
                map: this.map,
                content: '',
                position: null,
                shadowStyle: 0,
                padding: '14px 13px 13px 13px',
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 0,
                disableAutoPan: true,
                hideCloseButton: true,
                arrowPosition: 50,
                arrowStyle: 0,
                arrowSize: 10,
                backgroundClassName: 'markerLabel'
            });

            // close station detail by clicing on the map
            this.map.addListener('click', function () {
                this.selectedStationIdx = null;
                this.selectedPaymenttype = {};
            }.bind(this));

            window.setInterval(function () {
                this.loadStatus();
            }.bind(this), 1000 * 60);

            /// search
            const input = document.getElementById('search-input');

            const options = {
                fields: ['geometry', 'icon', 'name'],
                strictBounds: false,
                types: ['(regions)'],
            };

            const searchBox = new google.maps.places.Autocomplete(input, options);

            // Bias the SearchBox results towards current map's viewport.
            this.map.addListener('bounds_changed', () => {
                searchBox.setBounds(this.map.getBounds());
            });

            let searchMarkers = [];

            searchBox.addListener('place_changed', () => {
                const place = searchBox.getPlace();

                console.log(place);

                if (!place) {
                    return;
                }

                // Clear out the old markers.
                searchMarkers.forEach((marker) => {
                    marker.setMap(null);
                });
                searchMarkers = [];

                // For each place, get the icon, name and location.
                const bounds = new google.maps.LatLngBounds();

                if (!place.geometry || !place.geometry.location) {
                    console.log('Returned place contains no geometry');
                    return;
                }

                const icon = {
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };

                // Create a marker for each place.
                searchMarkers.push(
                    new google.maps.Marker({
                        map: this.map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                    })
                );
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }

                this.map.fitBounds(bounds);
            });



            /// search end
        },
        watch: {
            zoom(v) {
                this.map.setZoom(v);
                this.updateMarkers();
            },
            fueltype: 'loadMasterlist',
            language: 'loadMasterlist',
            show_planned: 'updateMarkers',
            show_eu: 'updateMarkers',
        },
        computed: {
            selectedStation() {
                if (this.debugMode) {
                    return this.dummyStation();
                }

                if (this.selectedStationIdx && this.stations[this.selectedStationIdx]) {
                    return this.stations[this.selectedStationIdx]
                }

                return {};
            },
            counts() {
                var counts = { open: 0, planned: 0 };

                for (let i in this.markers) {
                    var e = this.markers[i];
                    // allways count planned stations, visible or not
                    if (!e.visible && e.data.status !== 'PLANNED') {
                        continue;
                    }

                    // do not count stations, outside of germany if country filter is active
                    if (!this.show_eu && e.data.countryshortname !== 'DE') {
                        continue;
                    }

                    // do not count stations for operators not displayed
                    if (this.operator != "" && e.data.fullData.operatorname !== this.operator) {
                        continue;
                    }

                    switch (e.data.status) {
                        // count all stations as open, except planned
                        case 'EXCEPTION':
                        case 'CLOSED':
                        case 'OPEN':
                            counts.open++;
                            break;
                        case 'PLANNED':
                            counts.planned++;
                            break;
                    }
                }

                return counts;
            },
            statusDetail() {
                let stationData = this.selectedStation;

                let status = {
                    text: '',
                    icon: '',
                    trialText: ''
                };

                if (!stationData.idx) return status;

                status.text = this.translate(this.fueltype) + " - ";

                switch (stationData.combinedstatus) {
                    case 'OPEN':
                        if (stationData.status_unknown) {
                            status.text += this.translate("no_live_status_info");
                        } else {
                            status.text += this.translate("live");
                            // separate icon for station with combined remark
                        }
                        break;
                    case 'CLOSED':
                        status.text += this.translate("currently_closed");
                        break;
                    case 'PERMCLOSED':
                        status.text += this.translate("permanently_closed");
                        break;
                    case 'EXCEPTION':
                        status.text += this.translate("technical_error");
                        break;
                    case 'PLANNED':
                        status.text += stationData.progress_description || this.translate("implementation");
                        break;
                }

                if (stationData.combinedstatus !== 'PLANNED' && parseFloat(stationData.progress_percent) >= 90) {
                    status.trialText = stationData.progress_extratext;
                } else {
                    status.trialText = '';
                }

                status.icon = this.getIconStatus(stationData.combinedstatus, stationData.combinedremark || stationData.news, stationData.status_unknown, stationData.progress_percent);

                return status;
            }
        },
        methods: {
            showFeedback() {
                this.pw = this.randomString(20);
                this.username = this.randomString(10);
                this.feedbackSubmitted = false;
                this.feedbackText = '';
                this.feedbackError = '';
                this.feedbackEmail = '';
                this.showFeedbackForm = true;
            },
            sendFeedback(e) {
                const self = this;

                const form = e.target;
                const action = form.getAttribute('action');
                const method = form.getAttribute('method');

                fetch(action, {
                    method: method,
                    body: new FormData(form)
                })
                    .then(function (response) {
                        if (response.ok) {
                            return response.text();
                        } else {
                            return response.json();
                        }
                    })
                    .then(function (output) {
                        self.feedbackSubmitted = true;
                    });
            },
            randomString(length) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                return result;
            },
            translate(identifier) {
                if (this.translations[this.language][identifier]) {
                    return this.translations[this.language][identifier];
                }

                return "";
            },
            dummyStation() {
                return {
                    'idx': '327',
                    'name': 'Aachen',
                    'street': 'Prager Ring',
                    'streetnr': '106',
                    'zip': '52070',
                    'city': 'Aachen',
                    'has_350_large': 't',
                    'has_350_small': 't',
                    'has_700_small': 't',
                    'image': null,
                    'latitude': '50.797417',
                    'longitude': '6.108906',
                    'operatorname': 'H2 MOBILITY',
                    'operatorlogo': '676',
                    'hostname': 'Shell',
                    'operatorhotline': '+49 800 400 2023',
                    'countryshortname': 'DE',
                    'funding': 'Hydrogen Mobility Europe (H2ME)',
                    'combinedstatus': 'OPEN',
                    'combinedremark': 'some combined remark',
                    'status_unknown': false,
                    'activity_message': 'Letzte Betankung an dieser Station:\n2,05 kg vor mehr als 24 Stunden',
                    'openinghours_nextchange_message': 'openinghours_nextchange_message',
                    'progress_percent': null,
                    'progress_description': null,
                    'progress_extratext': null,
                    'price_message': '123,99 Eur / kg',
                    'opening_hours': '24 Stunden täglich geöffnet',
                    'date_commissioning_message': null,
                    'comments': 'some comments about the station',
                    'paymenttypes': [
                        {
                            'name': 'h2_live_card',
                            'apiname': 'h2_live_card',
                            'descr': 'H2 MOBILITY Card',
                            'page': 'H2.LIVE-Card'
                        }
                    ]
                };

            },
            loadStatus() {
                // disable refresh when feedback form is open. This prevents the form from being cleared on reload.
                if (this.showFeedbackForm) return;

                var self = this;
                this.loading = true;
                var xhttp = new XMLHttpRequest();

                let fuelstationsApiStatusURL = `https://fuelstations.h2-api.live/v1/fuelstation/statuslist?fuel_type=${this.fueltype}&language=${this.language}&__show_permclosed__=1`

                xhttp.open('GET', fuelstationsApiStatusURL, true);
                xhttp.setRequestHeader("x-api-token", this.api_token);

                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var json = JSON.parse(this.responseText);
                        if (json) {

                            for (let index = 0; index < json.fuelstation.length; index++) {
                                const fuelstation = json.fuelstation[index];

                                if (!fuelstation || !fuelstation.idx || !self.stations || !self.stations[fuelstation.idx]) {
                                    console.log("error");
                                    continue;
                                }
                                self.stations[fuelstation.idx] = Object.assign(self.stations[fuelstation.idx], fuelstation)
                            }

                            if (self.markers) {
                                for (var i in self.markers) {
                                    self.markers[i].setMap(null);
                                }
                            }
                            self.markers = {};
                            let listOfFundingPageNames = [];
                            for (var key in self.stations) {
                                var station = self.stations[key];
                                if (listOfFundingPageNames.indexOf(station.fundingpage) == -1) listOfFundingPageNames.push(station.fundingpage);
                                self.addMarker(station.latitude, station.longitude, station.name, station.idx, station.combinedstatus, station.combinedremark || station.news, station.progress_percent, station);
                            }
                            self.updateMarkers();
                        }
                        self.loading = false;
                    }
                };
                xhttp.send();
            },
            loadMasterlist() {
                var self = this;
                this.loading = true;
                var xhttp = new XMLHttpRequest();

                let fuelstationsApiMasterURL = `https://fuelstations.h2-api.live/v1/fuelstation/masterlist?fuel_type=${this.fueltype}&language=${this.language}&__show_permclosed__=1`

                xhttp.open('GET', fuelstationsApiMasterURL, true);
                xhttp.setRequestHeader("x-api-token", this.api_token);

                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var json = JSON.parse(this.responseText);
                        if (json) {
                            self.stations = {};

                            json.fuelstation.forEach(station => {
                                self.stations[station.idx] = station;
                            });

                            self.loadStatus();
                        }
                    }
                };
                xhttp.send();
            },
            loadCountries() {
                var self = this;
                this.loading = true;
                var xhttpcountry = new XMLHttpRequest();
                xhttpcountry.open('GET', `${this.fullurl}base.php?__type__=fuelcountry&action=xmllist&__language__=${this.language}&__transform__=json&__t__=${this.api_token}`, true);
                xhttpcountry.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var json = JSON.parse(this.responseText);
                        if (json) {
                            for (var key in json.fuelcountry) {
                                var value = json.fuelcountry[key];
                                self.addCountryMarker(value.symbol_latitude, value.symbol_longitude, value.idx, value.shortname, value.symbol_webfile);
                            }
                        }
                        self.updateMarkers();
                    }
                    self.loading = false;
                };
                xhttpcountry.send();
            },
            toggleFeultype() {
                if (this.fueltype == 'P700_SMALL') {
                    this.fueltype = 'P350_LARGE';
                } else {
                    this.fueltype = 'P700_SMALL';
                }
            },
            showCurrentPosition() {
                this.positionmarker.setPosition(this.geolocation);
                this.positionmarker.setMap(this.map);

                document.getElementById("search-input").value = "";

                this.map.setCenter(this.geolocation);
                this.zoom = 16;
            },
            openNavigation() {
                window.open('https://www.google.com/maps/dir/?api=1&origin=' + this.geolocation.lat + ',' + this.geolocation.lng + '&destination=' + this.selectedStation.latitude + ',' + this.selectedStation.longitude + '&travelmode=driving');
            },

            addMarker(lat, lon, name, id, status, info, progress, stationJson) {
                var self = this;

                var iconName = this.getIconStatus(status, info, stationJson.status_unknown, progress);
                var iconUrl = `${this.fullurl}static/h2mobility/widget/img/map_marker_${iconName}.svg`;

                if (!this.markers[id]) {
                    if (!lat || lat == '') lat = 0.0;
                    if (!lon || lon == '') lon = 0.0;

                    var markerLayer = 0;
                    if (iconName.indexOf('open') != -1) markerLayer = 7;
                    if (iconName.indexOf('test_operation_open') != -1) markerLayer = 6;
                    else if (iconName.indexOf('closed') != -1) markerLayer = 5;
                    // get numeric suffix from iconName eg. planned_status_2 -> 2.
                    // higher numer, means more progres
                    // planned_unknown results in NaN and will be replaced by 0
                    else if (iconName.indexOf('planned') != -1) try { markerLayer = parseInt(iconName.split('_').pop()); } catch { }

                    if (isNaN(markerLayer)) markerLayer = 0;

                    // marker was not added yet, so we initialize it
                    this.markers[id] = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(lat), parseFloat(lon)),
                        map: this.map,
                        title: name,
                        optimized: true,
                        icon: {
                            url: iconUrl,
                            scaledSize: new google.maps.Size(26, 26),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(11, 11),
                        },
                        data: {
                            status: status,
                            id: id,
                            name: name,
                            countryshortname: stationJson.countryshortname,
                            fullData: stationJson
                        },
                        zIndex: markerLayer
                    });

                    this.markers[id].addListener('mouseover', function () {
                        self.infoBubble.set('content', this.data.name);
                        self.infoBubble.open(this.map, this);
                    });

                    this.markers[id].addListener('mouseout', function () {
                        self.infoBubble.close();
                    });

                    this.markers[id].addListener('click', function () {
                        self.infoBubble.close();
                        self.selectedStationIdx = id;
                    });
                } else {
                    // marker was added, so we update it
                    this.markers[id].getIcon().url = iconUrl;
                    this.markers[id].data.status = status;
                    this.markers[id].data.countryshortname = stationJson.countryshortname;
                    this.markers[id].data.name = name;
                    this.markers[id].data.fullData = stationJson;
                }
            },
            addCountryMarker(lat, lon, id, shortname, imageid) {
                var self = this;

                if (!lat || lat == '') lat = 0.0;
                if (!lon || lon == '') lon = 0.0;

                if (!this.country_markers[id]) {
                    this.country_markers[id] = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(lat), parseFloat(lon)),
                        map: this.map,
                        title: shortname,
                        countryshortname: shortname,
                        optimized: true,
                        counter: new google.maps.Marker({
                            map: this.map,
                            optimized: true,
                            label: {
                                text: '',
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontFamily: 'apercu-regular'
                            },
                            icon: {
                                url: `${this.fullurl}static/h2mobility/widget/img/fortschritt_weiß_statusbar.svg`,
                                size: new google.maps.Size(20, 20),
                                scaledSize: new google.maps.Size(20, 20),
                                anchor: new google.maps.Point(0, 25),
                                labelOrigin: new google.maps.Point(10, 10)
                            },
                            zIndex: 2
                        }),
                        future: new google.maps.Marker({
                            map: this.map,
                            optimized: true,
                            label: {
                                text: '',
                                fontSize: '14px',
                                lineHeight: '22px',
                                fontFamily: 'apercu-regular',
                                color: '#ffffff'
                            },
                            icon: {
                                url: `${this.fullurl}static/h2mobility/widget/img/fortschritt_blau_statusbar.svg`,
                                size: new google.maps.Size(20, 20),
                                scaledSize: new google.maps.Size(20, 20),
                                anchor: new google.maps.Point(-15, 25),
                                labelOrigin: new google.maps.Point(10, 10)
                            },
                            zIndex: 3
                        }),
                        icon: {
                            url: `${this.fullurl}webfile/show/${imageid}`,
                            scaledSize: new google.maps.Size(44, 44),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(22, 22)
                        },
                        zIndex: 1
                    });

                    this.country_markers[id].addListener('click', function () {
                        self.map.setCenter(self.country_markers[id].position);
                        self.zoom = 6;
                    });

                    this.country_markers[id].counter.bindTo('position', this.country_markers[id]);
                    this.country_markers[id].future.bindTo('position', this.country_markers[id]);
                }
            },
            updateMarkers() {
                for (var i in this.markers) {
                    if (this.zoom > 4) {
                        if (!this.show_eu && this.markers[i].data['countryshortname'] != this.default_country) {
                            // hide stations with country code != default_country if show_eu is false
                            this.markers[i].setMap(null);
                        } else if (!this.show_planned && this.markers[i].data['status'] == 'PLANNED') {
                            // hide stations with status planned if show_planned is false
                            this.markers[i].setMap(null);
                        } else if (this.operator != '' && this.markers[i].data.fullData['operatorname'] != this.operator) {
                            // hide stations with non matching operator, if filter is set
                            this.markers[i].setMap(null);
                        } else {
                            this.markers[i].setMap(this.map);
                        }
                    } else {
                        this.markers[i].setMap(null);
                    }
                }

                for (let i in this.country_markers) {
                    var country_marker = this.country_markers[i];

                    var stations = 0;
                    var future_stations = 0;

                    for (let m in this.markers) {
                        var data = this.markers[m].data;
                        if (data.status !== 'PLANNED' && data.countryshortname === country_marker.countryshortname) stations++;
                        if (data.status === 'PLANNED' && data.countryshortname === country_marker.countryshortname) future_stations++;
                    }

                    country_marker.setMap(null);
                    country_marker.counter.setMap(null);
                    country_marker.future.setMap(null);

                    if (this.map.zoom > 4 || (!this.show_eu && country_marker.title != this.default_country)) {
                        continue;
                    }

                    // show root marker if we have at least 1 station or 1 future station
                    if (stations > 0 || (this.show_planned && future_stations > 0)) {
                        country_marker.setMap(this.map);
                    }


                    if (stations > 0) {
                        country_marker.counter.setMap(this.map);
                        country_marker.counter.label.text = String(stations);
                    }

                    if (this.show_planned && future_stations > 0) {
                        country_marker.future.setMap(this.map);
                        country_marker.future.label.text = String(future_stations);

                        if (stations === 0) {
                            country_marker.future.icon.anchor = new google.maps.Point(0, 25);
                        }
                    }
                }
            },
            getIconStatus(cstatus, info, status_unknown, progress) {
                var cleanedCStatus = cstatus.toLowerCase();
                if (!info) info = null;

                var statusAddInfo = (info != null && info != '') ? info : '';

                if (cleanedCStatus != 'planned' && progress != null && progress >= 90) {

                    if (cleanedCStatus != 'open') {
                        return 'test_operation_closed';
                    } else {
                        return 'test_operation_open';
                    }
                }

                if (cleanedCStatus == 'exception') {
                    if (info != null) {
                        return 'closed_info';
                    } else {
                        return 'closed';
                    }
                }

                if (cleanedCStatus == 'permclosed') {
                    return 'permclosed';
                }

                if (cleanedCStatus == 'open') {
                    statusAddInfo = (info != null && info != '') ? '_info' : '';
                    /**
                     * Some fuel stations are not tracked but in the system they have the status open,
                     * we don't whether this is true or not. For this reason we have in fullData
                     * the parameter status_unknown. If status_unknown is true and the marker status is
                     * open, we use the green icon with the questionmark.
                    */
                    if (status_unknown === true) {
                        return 'open_unknown';
                    }
                } else if (cleanedCStatus == 'closed') {
                    return 'closed_time';
                } else if (cleanedCStatus == 'planned') {
                    var floatProgress = parseFloat(progress);
                    if (floatProgress < 30) statusAddInfo = '_status_1';
                    else if (floatProgress < 50) statusAddInfo = '_status_2';
                    else if (floatProgress < 70) statusAddInfo = '_status_3';
                    else if (floatProgress < 90) statusAddInfo = '_status_4';
                    // progress >= 90 is handled already, as test_operation
                    else statusAddInfo = '_unknown';
                }

                return cleanedCStatus + statusAddInfo;
            }
        }
    });
}