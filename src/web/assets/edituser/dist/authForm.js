!function(){var t={d:function(e,a){for(var i in a)t.o(a,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:a[i]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};!function(){"use strict";t.r(e),t.d(e,{AuthenticatorFormHandler:function(){return a}});class a{constructor(){this.endpoint="authentication/update-authenticator-settings",this.disabled=!1,this.$container=$("#authenticator-settings"),this.attachEvents()}attachEvents(){$(".authenticator-field").on("keydown",(t=>{if("Enter"==t.key)return t.stopImmediatePropagation(),this.handleAuthenticatorUpdate(),!1})),$("#update-authenticator").on("click",(t=>{t.stopImmediatePropagation(),this.handleAuthenticatorUpdate()}))}handleAuthenticatorUpdate(){if(Craft.elevatedSessionManager.fetchingTimeout)return;const t=$(".authenticator-field.detach"),e=$("#verification-code-1"),a=$("#verification-code-2");if(t.length>0)t.val().length>0&&("detach"!==t.val()?Garnish.shake(t):Craft.elevatedSessionManager.requireElevatedSession(this.submitAuthenticatorUpdate.bind(this)));else{if(0==e.val().length||0==a.val().length)return;Craft.elevatedSessionManager.requireElevatedSession(this.submitAuthenticatorUpdate.bind(this))}}submitAuthenticatorUpdate(){if(this.disabled)return;this.disable();const t=$("input.authenticator-field");let e={};for(const a of t)e[a.getAttribute("name")]=a.value;Craft.postActionRequest(this.endpoint,e,((t,e)=>{this.enable(),t.message&&alert(t.message),t.error&&alert(t.error),t.html&&(this.$container.replaceWith(t.html),this.$container=$("#authenticator-settings"),this.attachEvents())}))}disable(){this.disabled=!0,this.$container.fadeTo(100,.5)}enable(){this.disabled=!1,this.$container.fadeTo(100,1)}}}();var a=Craft="undefined"==typeof Craft?{}:Craft;for(var i in e)a[i]=e[i];e.__esModule&&Object.defineProperty(a,"__esModule",{value:!0})}();
//# sourceMappingURL=authForm.js.map