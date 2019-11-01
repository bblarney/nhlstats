import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nhlURL: string
  data: any

  constructor(private http: HttpClient) { 
    this.nhlURL = "https://statsapi.web.nhl.com/api/v1/"
  }

  public getPlayer(id: number){
    return this.http.get(this.nhlURL + '/people/' + id)
  }

  public getTeam(id: number){
    return this.http.get(this.nhlURL + '/teams/' + id)
  }

  public getRoster(id: number){
    return this.http.get(this.nhlURL + '/teams/' + id + '/roster')
  }

  public getAllTeams(){
    return this.http.get(this.nhlURL + '/teams/')
  }

  public getDraft(id: number){
    return this.http.get(this.nhlURL + '/draft/' + id)
  }

  public getRecentDraft(){
    return this.http.get(this.nhlURL + '/draft/')
  }

  public getCustom(custom: string){
    return this.http.get('https://statsapi.web.nhl.com' + custom)
  }

  public getCurrentStats(id: number){
    return this.http.get(this.nhlURL + '/people/' + id + '/stats?stats=statsSingleSeason')
  }

  public getTotalPlayer(id: number){
    let player = this.http.get(this.nhlURL + '/people/' + id + '/stats?stats=statsSingleSeason')
    let stats =  this.http.get(this.nhlURL + '/people/' + id)
    
    return forkJoin(player, stats)
  }
}
