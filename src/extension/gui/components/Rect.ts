/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/// <reference path="../../../egret/display/Graphics.ts"/>
/// <reference path="../../../egret/display/Shape.ts"/>
/// <reference path="../core/UIComponent.ts"/>

module ns_egret {

	/**
	 * @class ns_egret.Rect
	 * @classdesc
	 * 矩形绘图元素。此组件可响应鼠标事件。
	 * @extends ns_egret.UIComponent
	 */
	export class Rect extends UIComponent{
		/**
		 * 构造函数
		 * @method ns_egret.Rect#constructor
		 */		
		public constructor(){
			super();
			this.touchChildren = false;
		}

        private _graphics:Graphics;

        public get graphics():Graphics{
            if(!this._graphics){
                var rendererContext = ns_egret.MainContext.instance.rendererContext;
                this._graphics = new Graphics(rendererContext);
            }
            return this._graphics;
        }

        public _render(renderContext:RendererContext):void {
            if(this._graphics)
                this._graphics._draw();
            super._render(renderContext);
        }

		private _fillColor:number = 0xFFFFFF;
		/**
		 * 填充颜色
		 * @member ns_egret.Rect#fillColor
		 */
		public get fillColor():number{
			return this._fillColor;
		}
		public set fillColor(value:number){
			if(this._fillColor==value)
				return;
			this._fillColor = value;
			this.invalidateDisplayList();
		}
		
		private _fillAlpha:number = 1;
		/**
		 * 填充透明度,默认值为0。
		 * @member ns_egret.Rect#fillAlpha
		 */
		public get fillAlpha():number{
			return this._fillAlpha;
		}
		public set fillAlpha(value:number){
			if(this._fillAlpha==value)
				return;
			this._fillAlpha = value;
			this.invalidateDisplayList();
		}
		
		private _strokeColor:number = 0x444444;
		/**
		 * 边框颜色,注意：当strokeAlpha为0时，不显示边框。
		 * @member ns_egret.Rect#strokeColor
		 */
		public get strokeColor():number{
			return this._strokeColor;
		}

		public set strokeColor(value:number){
			if(this._strokeColor==value)
				return;
			this._strokeColor = value;
			this.invalidateDisplayList();
		}

		private _strokeAlpha:number = 0;
		/**
		 * 边框透明度，默认值为0。
		 * @member ns_egret.Rect#strokeAlpha
		 */
		public get strokeAlpha():number{
			return this._strokeAlpha;
		}
		public set strokeAlpha(value:number){
			if(this._strokeAlpha==value)
				return;
			this._strokeAlpha = value;
			this.invalidateDisplayList();
		}
		
		private _strokeWeight:number = 1;
		/**
		 * 边框粗细(像素),注意：当strokeAlpha为0时，不显示边框。
		 * @member ns_egret.Rect#strokeWeight
		 */
		public get strokeWeight():number{
			return this._strokeWeight;
		}
		public set strokeWeight(value:number){
			if(this._strokeWeight==value)
				return;
			this._strokeWeight = value;
			this.invalidateDisplayList();
		}

        /**
         * @see egret.DisplayObject.measureBounds
         * @returns {Rectangle}
         * @private
         */
        public _measureBounds():ns_egret.Rectangle {
            var bounds:Rectangle = super._measureBounds();
            var w:number = this.width;
            var h:number = this.height;
            var x:number = 0;
            var y:number = 0;
            if(x<bounds.x){
                bounds.x = x;
            }
            if(y<bounds.y){
                bounds.y = y;
            }
            if(x+w>bounds.right){
                bounds.right = x+w;
            }
            if(y+h>bounds.bottom){
                bounds.bottom = y+h;
            }
            return bounds;
        }

		/**
		 * @method ns_egret.Rect#updateDisplayList
		 * @param unscaledWidth {number} 
		 * @param unscaledHeight {number} 
		 */
		public updateDisplayList(unscaledWidth:number, unscaledHeight:number):void{
			super.updateDisplayList(unscaledWidth,unscaledWidth);
			var g:Graphics = this.graphics;
			g.clear();
			g.beginFill(this._fillColor,this._fillAlpha);
			if(this._strokeAlpha>0){
				g.lineStyle(this._strokeWeight,this._strokeColor,this._strokeAlpha,true,"normal","square","miter");
			}
            g.drawRect(0, 0, unscaledWidth, unscaledHeight);
			g.endFill();
		}
	}
}