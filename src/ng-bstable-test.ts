/**
 * Created by LIJA3 on 6/17/2016.
 */
import { Component,View, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";
import {ng_bstable} from "/jslib/ng-bstable.ts";
@Component({
        selector: "app"
    }
)
@View({
    directives: [ng_bstable],
    template:`
        <ng_bstable [option]="bsOption" [data]="data"></ng_bstable>
    `
})
export class app {
    constructor() {
        this.bsOption ={
            columns:[
                {
                    field:'rptOid',
                    title:'Report Template Oid',type:'edit'
                },
                {
                    field: 'rptName',
                    title: 'Report Name',type:'edit'
                }, {
                    field: 'createUser',
                    title: 'Create User',type:'edit'
                },{
                    field: 'createDate',
                    title: 'Create Date',type:'edit',
                    sortable:true
                }, {
                    field: 'rptType',
                    title: 'Report Type',type:'edit'
                }
            ],
            detailView:true,
            pagination:true,
            pageSize:100
        };
        this.data = Array.from(new Array(1000),(x,i)=>i).map(item =>
            ({
                rptOid:item,
                rptName:'Desfadfadf',
                createUser:'HORSUPP',
                rptType:'Builder',
                createDate:'201523431' + item
            }));
    }
}