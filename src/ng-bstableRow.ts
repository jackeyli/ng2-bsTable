/**
 * Created by jackeyli on 2016/6/28.
 */
import { Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";
import {ng_bstable} from './ng-bstable.ts'
@Directive({
     selector : "[ngBsTableRow]",
     inputs: ['initHandler:initHandler','ngBsTableRow:ngBsTableRow']
})
export class ng_bsTableRow{
    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader){
        this._ngEl.nativeElement.rowComponent = this;
    }
    @Output
    public loadExpandedRow()
    {
        this._loader.loadNextToLocation(<Type>ng_bstable,this._ngEl).then(function(cmp){
            this.initHandler(cmp.instance);
            this.expandedRow = cmp.instance;
        }.bind(this);
    }
    @Output
    public disposeExpandedRow()
    {
        if(this.expandedRow)
            this.expandedRow.dispose();
        this.expandedRow = null;
    }
}