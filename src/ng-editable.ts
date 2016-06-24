/**
 * Created by jackeyli on 2016/6/24.
 */
import {HostListener,Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,OnDestroy} from "angular2/core";
import {testEditComponent} from "/jslib/ng-editComponent.ts";
@Directive({
    selector:"[ng2_editable]",
    inputs:['ng2_editable:ng2_editable'],
    directives:[testEditComponent],
    host:{'(click)':'_onEdit($event)'}
})
export class ng2Editable{
    @Output('editCommit')  public onEditCommit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _ngEl: ElementRef,private _containerRef: ViewContainerRef,private _loader:DynamicComponentLoader){
    }
    _onEdit($event) {
        this._loader.loadNextToLocation(this.ng2_editable.editCmpType,this._ngEl).then(function(cmp){
             //cmp.init(this._ngEl,this.ng2_editable.editCmpOption);
            cmp.instance.onCommit.subscribe(function(value){
                this.onEditCommit.emit({value:value,refData:this.ng2_editable.refData});
                cmp.dispose();
            }.bind(this));
            cmp.instance.onCancel.subscribe(function(evt){
                cmp.dispose();
            }.bind(this));
        }.bind(this));
    }
    ngOnDestroy(){

    }
    public getElement(): ElementRef {
        return this._ngEl;
    }
}