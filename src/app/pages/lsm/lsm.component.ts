import { Component } from '@angular/core';


const TABLE_DATA = [
  {Feature: "register", Syntax: "static  register(componentID:  string)", Explanation: "Registeres a namespace in the localstorage and returns a registered localstorage.helper object."},
  {Feature: "add", Syntax: "add(...newEntry: LocalstorageToken[])", Explanation: "It will add a new localstorage token to the registered namespace if the key doesn't exist yet. It also supports manually passing multiple tokens at once."},
  {Feature: "force", Syntax: "force(...newEntry: LocalstorageToken[])", Explanation: "Identical to localstorage.setItem(key, value) just using the localstorageToken objects, it adds and updates in the registered localstorage namespace. It also supports manually passing multiple tokens at once."},
  {Feature: "update", Syntax: "update(...newEntry: LocalstorageToken[])", Explanation: "Updates a given token in the registered namespace with the value of the passed token. This only works if the token already existst. It also supports manually passing multiple tokens at once."},
  {Feature: "delete", Syntax: "delete(...key: string[])", Explanation: "Deletes the token(s) in the registered namespace with the given key(s)."},
  {Feature: "get", Syntax: "get(key:  string) ", Explanation: "Returns the value of the token in the registered namespace with the given key."},
  {Feature: "getAllEntries", Syntax: "getAllEntries()", Explanation: "Returns all localstorageToken objects in the registered namespace of the localstorage."}
]

@Component({
  selector: 'app-lsm',
  templateUrl: './lsm.component.html',
  styleUrls: ['./lsm.component.scss']
})
export class LsmComponent {

  constructor(){}
  displayedColumns: string[] = ['Feature', 'Syntax', 'Explanation'];
  dataSource = TABLE_DATA;
}
