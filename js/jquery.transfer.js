/*! jquery-transfer 穿梭框组件 License LGPL  http://github.com/shixinke/jquery-transfer By 诗心客 version:1.0 */
(function($){
    function Transfer(selector, options) {
        this.selector = selector;
        this.options = options;
        this.sourceItemList = [];
        this.targetItemList = [];
    }
    Transfer.prototype.init = function(){
        if (this.options.source.substr(0, 1) == '#') {
            var $source = $(this.options.source);
        } else {
            var $source = this.selector.find(this.options.source);
        }
        if ($source.length < 0) {
            throw new Error('the source selector not found');
            return false;
        }
		this.options.formName = $source.attr('name');
        var self = this;
        $source.find('option').each(function(){
            var obj = {};
            obj.value = $(this).val();
            obj.text = $(this).text();
            if ($(this).attr('selected') == 'selected') {
                self.targetItemList.push(obj);
            } else {
                self.sourceItemList.push(obj);
            }
        });

    };
    $.fn.transfer = function(options) {
        var settings = $.extend({}, $.fn.transfer.defaults, options);
        var _this;
        return this.each(function(){
            _this = $(this);
            var transfer = new Transfer(_this, settings);
            transfer.init();
            var template = $.fn.transfer.defaults.template.
			    replace('{{name}}', transfer.options.formName).
                replace('{{sourceTitle}}', settings.sourceTitle).
                replace('{{targetTitle}}', settings.targetTitle).
                replace(/\{\{iconPrefix}}/g, settings.iconPrefix).
                replace(/\{\{iconSearch}}/g, settings.iconSearch).
                replace(/\{\{iconLeft}}/g, settings.iconLeft).
                replace(/\{\{iconRight}}/g, settings.iconRight).
                replace('{{sourceCount}}', transfer.sourceItemList.length).
                replace('{{targetCount}}', transfer.targetItemList.length);
            var $html = $(template);
            var sourceHtml = '';
            var targetHtml = '';
            for (var i=0; i< transfer.sourceItemList.length; i++) {
                sourceHtml += settings.itemTpl.replace(/\{\{value\}\}/g, transfer.sourceItemList[i].value).replace(/\{\{text\}\}/g, transfer.sourceItemList[i].text);
            }
            for (var i=0; i< transfer.targetItemList.length; i++) {
                targetHtml += settings.itemTpl.replace(/\{\{value\}\}/g, transfer.targetItemList[i].value).replace(/\{\{text\}\}/g, transfer.targetItemList[i].text);
            }
            $html.find('.transfer-left-panel .transfer-panel-list').append(sourceHtml);
            $html.find('.transfer-right-panel .transfer-panel-list').append(targetHtml);
            _this.html($html.html());
			_this.$hidden = $('#transfer-hidden');
            _this.$sourcePanel = _this.find('.transfer-left-panel');
            _this.$targetPanel = _this.find('.transfer-right-panel');
            _this.$filterInput = _this.find('.transfer-panel-filter :input');
            _this.$sourceSelect = _this.find('.transfer-left-panel .transfer-panel-list');
            _this.$targetSelect = _this.find('.transfer-right-panel .transfer-panel-list');
            _this.$buttons = _this.find('.transfer-buttons');
            _this.$addBtn = _this.find('.btn-add-item');
            _this.$removeBtn = _this.find('.btn-del-item');
            _this.$checkboxInput = _this.find('.transfer-panel-body .checkbox-input :checkbox');
            _this.$checkAllInput = _this.find('.transfer-panel-footer .checkbox-input :checkbox')
            _this._sourceItemList = [];
            _this._targetItemList = [];

            var height = _this.find('.transfer-panel').innerHeight();
            var marginTop = (height - _this.$buttons.innerHeight()) / 2;
            _this.$buttons.css('marginTop', marginTop);

            function checkBtnStatus(parent) {
                var $btn;
                if (parent.hasClass('transfer-left-panel')) {
                    $btn = _this.$addBtn;
                } else {
                    $btn = _this.$removeBtn;
                }

                var checkboxLength = parent.find('.transfer-panel-body .checkbox-input :checkbox').length;
                var checkedLength = parent.find('.transfer-panel-body .transfer-panel-list :checkbox:checked').length;
                if (checkedLength > 0) {
                    $btn.attr('disabled', false);
                } else {
                    $btn.attr('disabled', true);
                }
				var values = [];
                _this.$targetSelect.find(':checkbox').each(function(){
                    values.push($(this).val());
                });
                _this.$hidden.val(values.join(','));
                parent.find('.selected-count').text(checkedLength);
                parent.find('.transfer-item-count').text(checkboxLength);
            }

            _this.$filterInput.keyup(function(){
                var value = $(this).val();
                var $itemList = $(this).parents('.transfer-panel').find('.transfer-panel-list')
                if (value == '') {
                    $itemList.find('.transfer-panel-item').show();
                } else {
                    $itemList.find(".transfer-panel-item:not([data-text*='" + value + "'])").hide();
                }
            });

            _this.$checkAllInput.click(function(){
                var $parent = $(this).parents('.transfer-panel');
                var $checkboxs = $parent.find('.transfer-panel-list .transfer-panel-item :checkbox');
                if ($(this).prop('checked')) {
                    $checkboxs.attr('checked', true);
                } else {
                    $checkboxs.attr('checked', false);
                }
                checkBtnStatus($parent);
            });

            _this.on('click', '.transfer-panel-body .checkbox-input :checkbox', function(){
                var $parent = $(this).parents('.transfer-panel');
                checkBtnStatus($parent)
            });

            _this.$addBtn.click(function(){
                var $checkedBoxs = _this.$sourcePanel.find('.transfer-panel-list .transfer-panel-item :checkbox:checked');
                var html = '';
                $checkedBoxs.each(function(){
                    var $parent = $(this).parents('.transfer-panel-item');
                    html += $parent.prop("outerHTML");
                    $parent.remove();
                });
                _this.$targetSelect.append(html);
                checkBtnStatus(_this.$sourcePanel);
                checkBtnStatus(_this.$targetPanel);
            });
            _this.$removeBtn.click(function(){
                var $checkedBoxs = _this.$targetPanel.find('.transfer-panel-list .transfer-panel-item :checkbox:checked');
                var html = '';
                $checkedBoxs.each(function(){
                    var $parent = $(this).parents('.transfer-panel-item');
                    html += $parent.prop("outerHTML");
                    $parent.remove();
                });
                _this.$sourceSelect.append(html);
                checkBtnStatus(_this.$targetPanel);
                checkBtnStatus(_this.$sourcePanel);
            });
            return _this;
        });
    };
    $.fn.transfer.defaults = {
        'template':                                         
            '<div class="transfer">\
                 <input type="hidden" id="transfer-hidden" name="{{name}}">\
                 <div class="transfer-item pull-left ">\
                     <div class="transfer-panel transfer-left-panel">\
                         <p class="transfer-panel-header">{{sourceTitle}}</p>\
                         <div class="transfer-panel-body">\
                             <div class="transfer-panel-filter">\
                                 <i class="input-icon {{iconPrefix}} {{iconSearch}}"></i>\
                                 <input autocomplete="off" placeholder="请输入搜索内容" size="small" icon="search" type="text" rows="2" validateevent="true" class="input-inner">\
                             </div>\
                             <div class="checkbox-group transfer-panel-list is-filterable">\
                             </div>\
                         </div>\
                         <p class="transfer-panel-footer">\
                             <label>\
                                 <span class="checkbox-input pull-left">\
                                     <input type="checkbox" class="checkbox-inline" value="">\
                                 </span>\
                                 <span class="checkbox-label pull-left">已选 <span class="selected-count">0</span>/<span class="transfer-item-count">{{sourceCount}}</span> 项</span>\
                             </label>\
                         </p>\
                     </div>\
                 </div>\
                 <div class="transfer-item pull-left">\
                     <div class="transfer-buttons">\
                        <button type="button" disabled="disabled" class="btn btn-default btn-add-item"><span><i class="{{iconPrefix}} {{iconRight}}"></i></span></button>\
                        <button type="button" disabled="disabled" class="btn btn-default btn-del-item"><span><i class="{{iconPrefix}} {{iconLeft}}"></i></span></button>\
                     </div>\
                 </div>\
                 <div class="transfer-item pull-left">\
                     <div class="transfer-panel  transfer-right-panel">\
                         <p class="transfer-panel-header">{{targetTitle}}</p>\
                         <div class="transfer-panel-body">\
                             <div class="transfer-panel-filter">\
                                 <i class="input-icon {{iconPrefix}} {{iconSearch}}"></i>\
                                 <input autocomplete="off" placeholder="请输入搜索内容" size="small" icon="search" type="text" rows="2" validateevent="true" class="input-inner">\
                             </div>\
                             <div class="checkbox-group transfer-panel-list is-filterable">\
                             </div>\
                         </div>\
                         <p class="transfer-panel-footer">\
                             <label>\
                                 <span class="checkbox-input pull-left">\
                                     <input type="checkbox" class="checkbox-inline" value="">\
                                 </span>\
                                 <span class="checkbox-label pull-left">已选 <span class="selected-count">0</span>/<span class="transfer-item-count">{{targetCount}}</span> 项</span>\
                             </label>\
                         </p>\
                     </div>\
                 </div>\
            </div>',
        'itemTpl':'<label class="transfer-panel-item" data-text="{{text}}" data-value="{{value}}">\
                       <span class="checkbox-input pull-left">\
                           <input type="checkbox" class="checkbox-inline" value="{{value}}">\
                       </span>\
                       <span class="checkbox-label pull-left">\
                           <span>{{text}}</span>\
                       </span>\
                   </label>',
        'source': 'select:first',
        'sourceTitle':'列表1',
        'target': 'select:last',
        'targetTitle':'列表2',
        'iconPrefix':'iconfont',
        'iconSearch':'icon-search',
        'iconLeft':'icon-arrow-left',
        'iconRight':'icon-arrow-right'
    }
})(jQuery);