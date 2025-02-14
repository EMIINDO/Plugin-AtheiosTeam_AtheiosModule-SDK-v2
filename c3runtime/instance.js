"use strict";

{
    globalThis.C3.Plugins.AtheiosTeam_AtheiosModule.Instance = class AtheiosMuduleInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();

            const properties = this._getInitProperties();

            this.atheios = new Atheios();

            this._apiKeyAth = 0;
            this._apiSecretAth = 0;
            this._local = "true";
            this._testapi = "true";

            if (properties) {
                this._apiKeyAth = properties[0];
                var apiSecretAth = properties[1];
                this._local = properties[2];
                this._testapi = properties[3];
            }
            else {
                console.log("***DEBUG*** Ahteios Plugin: No credentials")
            }

            var runtime = this.runtime;
            var currInstance = this;
            var atheios = this.atheios;
            var myC3 = C3;

            this._lastMessageAth = "";
            this._lastResponseAth = "";

            this.onNonceAth = function (nonce) {
                return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, apiSecretAth));
            }

            ////////////////////////////////
            //// C3Memory
            this.C3Memory = {
                LastMessageAth: "", // Last Atheios Message
                LastResponseAth: "" // Last Atheios Response
            }

            const self = this;
            const Conditions = globalThis.C3.Plugins.AtheiosTeam_AtheiosModule.Cnds;

            ////////////////////////////////
            //// C3_triggers
            this.C3_trigger = {

                oninit: function () {
                    self.Call(Conditions.oninit);
                },
                onresponse: function () {
                    self.Call(Conditions.onresponse);
                },
                onmessage: function () {
                    self.Call(Conditions.onmessage);
                }

            };

            ////////////////////////////////
            //// CallFunction
            //// .... Call _trigger
            this.Call = function (_path) {
                const trigger = _path;

                self._trigger(trigger);
            };

            this.onInitAth = function () {
                currInstance.C3_trigger.oninit();
            }

            this.onMessageAth = function (message) {
                currInstance._lastMessageAth = JSON.stringify(message);

                currInstance.C3_trigger.onmessage();
            }

            this.onResponseAth = function (response) {
                currInstance._lastResponseAth = JSON.stringify(response);

                currInstance.C3_trigger.onresponse();
            }

        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        _loadFromJson(o) {
            // load state for savegames
        }
    };

}