/**
 * Created by LIJA3 on 6/17/2016.
 */
import { Pipe,Component, Directive, ElementRef, Renderer, EventEmitter, DynamicComponentLoader, Host, ViewEncapsulation, Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output } from "angular2/core";
import {ng_bsTableItem} from "./ng-bstableItem.ts";
import {bsTablePageEvent} from "./ng-bstableEvt.ts";
import {ngBsTablePaging} from './ng-bstablePaging.ts';
import {ng2Editable} from './ng-editable.ts';
import {defaultEditComponent} from './ng-editComponent.ts';
@Pipe({
        name:"paging",
        pure : false
      })
class pageFilter{
    transform(input,args){
        let pageSize = args[0],
            currPage = args[1],
            startIndex = pageSize * (currPage - 1),
            endIndex = pageSize * currPage < input.length ?
            pageSize *  currPage : input.length;
        if(pageSize != null && currPage != null) {
            return input.slice(startIndex, endIndex);
        }
        return input;
    }
}
@Pipe({
    name:"sorting",
    pure : false
})
class sortFilter{
    transform(input,args){
        let field = args[0],
             direction = args[1];
        if(field != null)
        {
            return input.sort((a,b)=>{return a[field] > b[field] ? (direction == 'asc' ? 1 : -1) :
                (direction == 'asc' ? -1 : 1);});
        }
        return input;
    }
}
@Pipe({
    name:'columning'
})
class columingPipe{
    transform(input,arg){
        if(arg[0] == 'columning') {
            return Array.isArray(input[0]) ? input : [input]
        }
        if(arg[0] == 'dataColumning') {
            let resolveGrp = function(grp){
                return Array.isArray(grp) ? (grp.reduce(function(a, b){
                   return (Array.isArray(resolveGrp(a)) ? resolveGrp(a) : [resolveGrp(a)])
                        .concat(Array.isArray(resolveGrp(b)) ? resolveGrp(b) : [resolveGrp(b)])
                })) : grp;
            }
            return resolveGrp(input).filter(function(item){return item.field});
        }
    }
}
@Component({
    selector : "ng_bstable",
    inputs : ["option:option","data:data"],
    directives:[ng_bsTableItem,ngBsTablePaging,ng2Editable],
    pipes:[pageFilter,sortFilter,columingPipe],
    template:`
        <div class="bootstrap-table">
            <div class="fixed-table-container">
                <div class="fixed-table-body">
                    <table data-toggle="table" class="table table-hover">
                        <thead>
                        <tr *ngFor="#columnRow of (option.columns|columning:'columning');#j=index">
                            <th *ngIf="option.detailView && j==0" [attr.rowspan]="getDetailViewRowSpan(option.columns)">
                                <div class="fht-cell"></div>
                            </th>
                            <th *ngFor="#column of columnRow" [attr.colspan]="column.colspan ? column.colspan : 1" [attr.rowspan]="column.rowspan? column.rowspan : 1">
                                 <div [ngClass]="genHeaderClass(column,column.sortDirection)" (click)="onHeaderClick($event,column)">{{column.title}}</div><div class="fht-cell"></div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr [ngClass]="option.rowStyle" *ngFor="#data of (datas |paging:pageSize:currPage|sorting:sortField:sortDirection)">
                                <td *ngIf="option.detailView">
                                    <a class="detail-icon" href="javascript:"><i class="glyphicon glyphicon-plus icon-plus"></i></a>
                                </td>
                                <td *ngFor = "#column of (option.columns | columning : 'dataColumning')" style="position:relative">
                                    <ngBsTableItem (editCommit)="onEditCommit($event);" (beginEdit) = "beginEdit($event)" [ng2_editable]="{editCmpType:getEditComponentType(),refData:{data:data,column:column}}" (onClick) = "cellClick($event)" (onDbClick)="cellDbClick($event)" [config]="column" [data]="data">
                                    </ngBsTableItem>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ngBsTablePaging *ngIf = "option.pagination"
            (pageSizeChange)="_onPageSizeChange($event)" (pageChange)="_onPageChange($event)" [pageSize]="option.pageSize"
            [currPage]="1" [totalRecords]="datas.length" >
            </ngBsTablePaging>
        </div>
     `
})
export class ng_bstable{
    constructor(){}
    set data(v:data)
    {
        this.pageSize = this.option.pageSize;
        this.currPage = 1;
        this.datas = v;
    }
    getEditComponentType(){
        return (<Type>defaultEditComponent)
    }
    beginEdit(evt) {
        if(this.editingCmp)
        {
            this.editingCmp.dispose();
        }
            this.editingCmp = evt.editCmp;
    }
    onEditCommit(evt){
        if(!evt.cancelEdit) {
            evt.refData.data[evt.refData.column.field] = evt.value;
        }
        this.editingCmp = null;
    }
    getDetailViewRowSpan(columns){
        if(Array.isArray(columns[0]))
        {
            return columns.reduce(function(a,b){
                return a.reduce(function(a,b){
                    return (a.rowspan ? a.rowspan : 1) > (b.rowspan ? b.rowspan : 1) ?
                        (a.rowspan ? a.rowspan : 1) : (b.rowspan ? b.rowspan : 1);
                }) + b.reduce(function(a,b){
                        return (a.rowspan ? a.rowspan : 1) > (b.rowspan ? b.rowspan : 1) ?
                            (a.rowspan ? a.rowspan : 1) : (b.rowspan ? b.rowspan : 1);
                    });
            })
        } else
        {
            return columns.reduce(function(a,b){
                return (a.rowspan ? a.rowspan : 1) > (b.rowspan ? b.rowspan : 1) ?
                    (a.rowspan ? a.rowspan : 1) : (b.rowspan ? b.rowspan : 1);
            })
        }
    }
    getTotalPage() {
        return Math.floor((this.datas.length + this.option.pageSize - 1) / this.option.pageSize));
    }
    genHeaderClass(column,sortDirection){
        return {
            'th-inner':true,
            'sortable':column.sortable,
            'asc':sortDirection == 'asc' && column.sortable,
            'desc':sortDirection == 'desc' && column.sortable
        }
    }
    _onPageSizeChange(event){
        this.pageSize = event.size;
    }
    _onPageChange(event) {
        this.pageSize = event.size;
        this.currPage = event.currPage;
    }
    onHeaderClick(event,column){
        switch (column.sortDirection){
            case 'asc':
                column.sortDirection = 'desc'
                break;
            case 'desc':
                column.sortDirection = 'asc'
                break;
            default:
                column.sortDirection = 'asc'
        }
        this._onSortChange(column.field,column.sortDirection);
    }
    _onSortChange(field,direction){
        this.sortField = field;
        this.sortDirection = direction;
    }
    cellClick()
    {

    }
    cellDbClick()
    {

    }
}
