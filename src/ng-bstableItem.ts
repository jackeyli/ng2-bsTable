/**
 * Created by LIJA3 on 6/17/2016.
 */
import {bsTableEvt} from "/jslib/ng-bstableEvt.ts";
import { Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";
@Component({
    selector : "ngBsTableItem",
    inputs: ['config: config','data:data'],
    host: {
        '(click)': '_onClick($event)',
        '(dbclick)':'_onDbClick($event)'
    },
    template:
    `
    <div [ngSwitch]="config.type">
        <template ngSwitchWhen="edit">
            <div [ngClass]="config.class" [innerHTML] =
            "config.formatter ? config.formatter(data[config.field],data,i) :data[config.field]">
            </div>
        </template>
        <template ngSwitchDefault>
            <div [ngClass]="config.class" [innerHTML] =
                "config.formatter ? config.formatter(data[config.field],data,i) :data[config.field]">
            </div>
        </template>
    </div>
    `
})
export class ng_bsTableItem{
    @Output() public onClick: EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>(false);
    @Output() public onDbClick: EventEmitter<bsTableEvt> = new EventEmitter<bsTableEvt>(false);
    constructor(){}
    _onClick(evt)
    {
        if(config.listeners['click'])
            config.listeners['click'](evt);
        this.onClick.emit(_getEvt());
    }
    _onDbClick(evt)
    {
        if(config.listeners['dbclick'])
            config.listeners['dbclick'](evt);
        this.onDbClick.emit(_getEvt());
    }
    _getEvt()
    {
        return <bsTableEvt>({
            value:data[config.field],
            row:data,
            col:config.col
        });
    }
}