/**
 * Created by LIJA3 on 6/17/2016.
 */
import { Component,View, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";
import {ng_bstable} from "./ng-bstable.ts";
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
        /*this.bsOption ={
            columns:[
                {
                    field:'test1',
                    title:'Test1',type:'edit'
                },
                {
                    field: 'test2',
                    title: 'Test2',type:'edit'
                }, {
                    field: 'test3',
                    title: 'Test3',type:'edit'
                },{
                    field: 'test4',
                    title: 'Test4',type:'edit',
                    sortable:true
                }, {
                    field: 'test5',
                    title: 'Test5',type:'edit'
                }
            ],
            detailView:true,
            pagination:true,
            pageSize:100
        };
        this.data = Array.from(new Array(100),(x,i)=>i).map(item =>
            ({
                test1:item,
                test2:'Desfadfadf',
                test3:'BX',
                test4:'Builder',
                test5:'201523431' + item
            }));*/
        this.data = Array.from(new Array(100),(x,i)=>i).map(
          item=>({
              "name": "ng-bsTable",
              "column1": item,
              "column2": item + 12
          })
        );
        this.bsOption = {
            columns:[
                [{
                    "field": "name",
                    "title": "Name",
                    "colspan": 1,
                    "rowspan": 2
                }, {
                    "title": "GroupedColumn",
                    "colspan": 2,
                    "rowspan": 1
                }],
                [{
                    "field": "column1",
                    "title": "Column1",
                    "colspan": 1,
                    "rowspan": 1,
                    sortable:true
                }, {
                    "field": "column2",
                    "title": "Column2",
                    "colspan": 1,
                    "rowspan": 1,
                    filterable:true
                }]
            ],
            detailView:true,
            pagination:true,
            pageSize:20
        }
    }
}