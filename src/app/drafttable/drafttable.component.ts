import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Team, Roster, Draft, Prospects } from '../team.model'

@Component({
  selector: 'app-drafttable',
  templateUrl: './drafttable.component.html',
  styleUrls: ['./drafttable.component.css']
})
export class DrafttableComponent implements OnInit {

  draft: any
  selectedYear: number
  singleDraft: Draft
  yearArray: number[] = new Array()
  draftProspects: Prospects[] = new Array()
  prospectStats: any

  constructor(private data: DataService) {
    for (let i = 2020; i >= 1963; i-- ){
      this.yearArray.push(i)
    } 
  }

  ngOnInit() {
    this.data.getRecentDraft().subscribe(res => {
      this.draft = res;
       this.draft.drafts.forEach(element => {
         this.singleDraft = element
       });
       this.singleDraft.rounds.sort((a,b) => a.roundNumber - b.roundNumber);
       this.getStats()
      });
  } 
  
  refreshYear(option: number){
    this.data.getDraft(option).subscribe(res => {
      this.draft = res;
       this.draft.drafts.forEach(element => {
         this.singleDraft = element
       });
       this.singleDraft.rounds.sort((a,b) => a.roundNumber - b.roundNumber);
       this.getStats()
     });   
  }

  getStats(){
    this.draftProspects = new Array()
    this.singleDraft.rounds.forEach(x => {
      x.picks.forEach(y => {
        this.data.getCustom(y.prospect.link).subscribe(res => {
          this.prospectStats = res
          this.draftProspects.push(this.prospectStats.prospects[0])
          console.log(this.draftProspects)
        })
      });
    });
  }

}
