!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(i,a){this.$element=e(i),this.options=e.extend({},t.DEFAULTS,e.isPlainObject(a)&&a),this.init()}var i=e("body"),a=e(document),n="qor.medialibrary.select",s="qor.bottomsheets",o="click."+n,r="enable."+n,d="disable."+n,l="reload."+s,c=".qor-select__select-icon",h=".qor-selectmany__hint",m=".qor-field__mediabox",u=".qor-field__mediabox-list",f=".qor-field__mediabox-item",p=".qor-field__mediabox-data",b=".qor-bottomsheets",g="is_selected",_="is_deleted",y="textarea.qor-file__options",S=".qor-cropper__toggle--delete",v=".qor-cropper__toggle--undo",D="qor-bottomsheets__mediabox";return t.prototype={constructor:t,init:function(){var e=this.$element;this.SELECT_MEDIABOX_UNDO_TEMPLATE=e.find('[name="media-box-undo-delete"]').html(),this.bind(),this.initSelectedMedia()},bind:function(){a.on(o,"[data-mediabox-url]",this.openBottomSheets.bind(this)).on(l,"."+D,this.reloadData.bind(this)),this.$element.on(o,S,this.deleteSelected.bind(this)).on(o,v,this.undoDeleteSelected.bind(this)).on("change.qor.cropper",y,this.imageCrop.bind(this))},deleteSelected:function(t){var i=e(t.target),a=i.closest(f);return a.addClass(_).append(this.SELECT_MEDIABOX_UNDO_TEMPLATE).find(".qor-file__list").hide(),this.updateMediaLibraryData(i.closest(u)),!1},undoDeleteSelected:function(t){var i=e(t.target),a=i.closest(f);return a.removeClass(_).find(".qor-file__list").show(),this.updateMediaLibraryData(i.closest(u)),i.closest(".qor-fieldset__alert").remove(),!1},imageCrop:function(t){var i=e(t.target).closest(f);this.syncImageCrop(i)},openBottomSheets:function(t){var a,n=e(t.target).closest("[data-mediabox-url]"),s=n.data();s.isDisabled||(this.BottomSheets=i.data("qor.bottomsheets"),this.bottomsheetsData=s,this.$parent=a=n.closest(m),this.$selectFeild=a.find(u),s.url=s.mediaboxUrl,this.SELECT_MANY_SELECTED_ICON=e('[name="select-many-selected-icon"]').html(),this.SELECT_MANY_HINT=e('[name="select-many-hint"]').html(),this.SELECT_MEDIABOX_TEMPLATE=a.find('[name="media-box-template"]').html(),this.SELECT_MEDIABOX_UNDO_TEMPLATE=a.find('[name="media-box-undo-delete"]').html(),this.BottomSheets.open(s,this.handleSelectMany.bind(this)))},initSelectedMedia:function(){var e,t,i=this.$element,a=i.find(f),n=JSON.parse(i.find(p).val());if(n)for(var s=0;s<n.length;s++)e=a.filter('[data-primary-key="'+n[s].ID+'"]'),t=e.data().description,t||e.data("description",n[s].Description)},initMedia:function(){var t,i,a,n=this.$selectFeild,s=n.find(f).not("."+_),o=e(b).find("tbody tr"),r=this;s.each(function(){a=e(this).data().primaryKey,t=o.filter('[data-primary-key="'+a+'"]').addClass(g),r.changeIcon(t,!0)}),o.each(function(){t=e(this),i=t.find(".qor-table--ml-slideout p img").first(),t.find(".qor-table__actions").remove(),i.length&&(t.find(".qor-table--medialibrary-item").css("background-image","url("+i.prop("src")+")"),i.parent().remove())}),"1"!=this.bottomsheetsData.maxItem&&this.updateHint(this.getSelectedItemData())},reloadData:function(){this.$selectFeild&&this.initMedia()},renderSelectMany:function(e){return window.Mustache.render(this.SELECT_MEDIABOX_TEMPLATE,e)},renderHint:function(e){return window.Mustache.render(this.SELECT_MANY_HINT,e)},getSelectedItemData:function(t){var i,a=t?t:this.$selectFeild,n=a.find(f).not("."+_),s=[];return n.size()&&n.each(function(){i=e(this).data(),s.push({ID:i.primaryKey,Url:i.originalUrl.replace(/.original.(\w+)$/,".$1"),Description:i.description})}),{files:s,selectedNum:s.length}},updateHint:function(t){var i;e.extend(t,this.bottomsheetsData),i=this.renderHint(t),e(h).remove(),e(b).find(".qor-page__body").before(i)},updateMediaLibraryData:function(e){var t=e?e.find(p):this.$selectFeild.find(p),i=this.getSelectedItemData(e);t.val(JSON.stringify(i.files))},changeIcon:function(t,i){var a=t.find(".qor-table--medialibrary-item"),n=a.size()?a:t.find("td:first");t.find(c).remove(),i&&("one"==i&&e("."+D).find(c).remove(),n.prepend(this.SELECT_MANY_SELECTED_ICON))},syncImageCrop:function(t,i){var a,n,s=JSON.parse(t.find(y).val()),o=t.data().mediaLibraryUrl,r={},d=["Width","Height"],l=t.find("img[data-size-name]");delete s.ID,delete s.Url,s.Sizes={},l.each(function(){n=e(this).data(),s.Sizes[n.sizeName]={};for(var t=0;t<d.length;t++)a="sizeResolution"+d[t],s.Sizes[n.sizeName][d[t]]=n[a]}),r.MediaOption=JSON.stringify(s),e.ajax({type:"PUT",url:o,data:JSON.stringify(r),contentType:"application/json",dataType:"json",success:function(a){r.MediaOption=JSON.parse(a.MediaOption),i&&e.isFunction(i)&&i(r,t)}})},showHiddenItem:function(e){e.removeClass(_).find(".qor-file__list").show(),e.find(".qor-fieldset__alert").remove()},removeItem:function(e){var t=e.primaryKey;this.$selectFeild.find('[data-primary-key="'+t+'"]').remove(),this.changeIcon(e.$clickElement)},addItem:function(t,i){var a=e(this.renderSelectMany(t)),n=a.find(".qor-file__input"),s=n.closest(f),o=this.$selectFeild.find('[data-primary-key="'+t.primaryKey+'"]'),r=this.bottomsheetsData.maxItem,d=this.getSelectedItemData().selectedNum,l=this;if(i||(1==r?this.changeIcon(t.$clickElement,"one"):this.changeIcon(t.$clickElement,!0)),r&&d>=r){if(1!=r)return void window.alert(this.bottomsheetsData.maxItemHint);this.$selectFeild.find(f).remove()}return o.size()?(this.showHiddenItem(o),void(1==r&&setTimeout(function(){l.BottomSheets.hide()},1e3))):(a.data("description",t.MediaOption.Description),a.appendTo(this.$selectFeild),t.MediaOption.CropOptions&&this.resetImages(t,a),a.find(y).val(JSON.stringify(t.MediaOption)),a.trigger("enable"),t.MediaOption.CropOptions||n.data("qor.cropper").load(t.MediaOption.URL,function(){l.syncImageCrop(s,l.resetImages)}),void((i||1==r)&&setTimeout(function(){l.BottomSheets.hide()},150)))},resetImages:function(t,i){var a=t.MediaOption.CropOptions,n=Object.keys(a),s=t.MediaOption.OriginalURL;if(/original/.test(s)){for(var o=n.length-1;o>=0;o--)a[n[o]].URL=s.replace(/original/,n[o]);i.find("img").each(function(){var t=e(this),i=t.data().sizeName;i&&"original"!=i&&a[i]&&t.prop("src",a[i].URL)})}},handleSelectMany:function(){var t=e(b),i={onSelect:this.onSelectResults.bind(this),onSubmit:this.onSubmitResults.bind(this)};t.qorSelectCore(i).addClass(D),this.initMedia()},onSelectResults:function(e){this.handleResults(e)},onSubmitResults:function(e){this.handleResults(e,!0)},handleResults:function(e,t){t?(e.MediaOption=JSON.parse(e.MediaOption),this.handleResultsData(e,t)):this.handleResultsData(e)},handleResultsData:function(e,t){var i,a=e.$clickElement;return e.mediaLibraryUrl||t||(e.mediaLibraryUrl=e.url),t?(e.mediaLibraryUrl=this.bottomsheetsData.mediaboxUrl+"/"+e.primaryKey,this.addItem(e,t),void this.updateDatas()):(a.toggleClass(g),i=a.hasClass(g),i?this.addItem(e):this.removeItem(e),void this.updateDatas())},updateDatas:function(){"1"!=this.bottomsheetsData.maxItem&&this.updateHint(this.getSelectedItemData()),this.updateMediaLibraryData()}},t.plugin=function(i){return this.each(function(){var a,s=e(this),o=s.data(n);if(!o){if(/destroy/.test(i))return;s.data(n,o=new t(this,i))}"string"==typeof i&&e.isFunction(a=o[i])&&a.apply(o)})},e(function(){var i='[data-toggle="qor.mediabox"]';e(document).on(d,function(a){t.plugin.call(e(i,a.target),"destroy")}).on(r,function(a){t.plugin.call(e(i,a.target))}).triggerHandler(r)}),t});