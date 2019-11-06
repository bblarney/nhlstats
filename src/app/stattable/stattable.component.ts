import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Team, Roster, Player, Stats } from '../team.model'
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-stattable',
  templateUrl: './stattable.component.html',
  styleUrls: ['./stattable.component.css']
})

export class StattableComponent implements OnInit {

  players: any
  playerStats: any
  playerPersonal: any
  roster: Roster[] = new Array()
  teamList: any
  teamArray: Team[] = new Array()
  selectedOption: number
  playerInfo: Player[] = new Array()
  playerTotalData: any[] = new Array()
  goalieTotalData: any[] = new Array()
  playerData: any
  sortedData: any[]

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.getAllTeams().subscribe(res => {
      this.teamList = res;
      var i = 0
       this.teamList.teams.forEach(element => {
         this.teamArray[i] = element
         i++
       });
       this.teamArray.sort((a,b) => a.name.localeCompare(b.name))
     });

    this.refreshTeam(10)
  } 
  
  refreshTeam(option: number){
    this.roster = new Array()
    this.playerInfo = new Array()
    this.playerTotalData = new Array()
    this.data.getRoster(option).subscribe(res => {
      this.players = res;
      var i = 0, x = 0, y = 0
      this.players.roster.forEach(element => {
        this.roster[i] = element
        i++
        this.data.getTotalPlayer(element.person.id).subscribe(res => {
          this.playerData = res
          //if stats cant be retrieved... possible case when roster player has 0gp
          if (this.playerData[0].stats[0].splits.length == 0){
          }else{
            if (this.playerData[1].people[0].primaryPosition.code == "G"){
              this.goalieTotalData[y] = res
              y++
              console.log(this.goalieTotalData)
            }else{
              this.playerTotalData[x] = res
              x++
            }    
          }
        }); 
      }); 
     });
  }

  sortPlayers(sort: Sort){  
    let data = this.playerTotalData.slice();
    if (!sort.active || sort.direction === '') {
      this.playerTotalData = data;
      return;
    }

    this.playerTotalData = this.playerTotalData.sort((a, b) => {
      var isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a[1].people[0].fullName, b[1].people[0].fullName, isAsc);
        case 'age': return this.compare(a[1].people[0].currentAge, b[1].people[0].currentAge, isAsc);
        case 'position': return this.compare(a[1].people[0].primaryPosition.name, b[1].people[0].primaryPosition.name, isAsc);
        case 'birthcity': return this.compare(a[1].people[0].birthCity, b[1].people[0].birthCity, isAsc);
        case 'birthcountry': return this.compare(a[1].people[0].birthCountry, b[1].people[0].birthCountry, isAsc);
        case 'gp': return this.compare(a[0].stats[0].splits[0].stat.games, b[0].stats[0].splits[0].stat.games, isAsc);
        case 'goals': return this.compare(a[0].stats[0].splits[0].stat.goals, b[0].stats[0].splits[0].stat.goals, isAsc);
        case 'assists': return this.compare(a[0].stats[0].splits[0].stat.assists, b[0].stats[0].splits[0].stat.assists, isAsc);
        case 'points': return this.compare(a[0].stats[0].splits[0].stat.points, b[0].stats[0].splits[0].stat.points, isAsc);
        case 'plusminus': return this.compare(a[0].stats[0].splits[0].stat.plusMinus, b[0].stats[0].splits[0].stat.plusMinus, isAsc);
        case 'shots': return this.compare(a[0].stats[0].splits[0].stat.shots, b[0].stats[0].splits[0].stat.shots, isAsc);
        case 'shpct': return this.compare(a[0].stats[0].splits[0].stat.shotPct, b[0].stats[0].splits[0].stat.shotPct, isAsc);
        case 'toi': return this.compare(a[0].stats[0].splits[0].stat.timeOnIce, b[0].stats[0].splits[0].stat.timeOnIce, isAsc);
        case 'toig': return this.compare(a[0].stats[0].splits[0].stat.timeOnIcePerGame, b[0].stats[0].splits[0].stat.timeOnIcePerGame, isAsc);
        case 'ppg': return this.compare(a[0].stats[0].splits[0].stat.points / a[0].stats[0].splits[0].stat.games, b[0].stats[0].splits[0].stat.points / b[0].stats[0].splits[0].stat.games, isAsc);
        default: return 0;
      }
    });
  }

  sortGoalies(sort: Sort){  
    let data = this.goalieTotalData.slice();
    if (!sort.active || sort.direction === '') {
      this.goalieTotalData = data;
      return;
    }

    this.goalieTotalData = this.goalieTotalData.sort((a, b) => {
      var isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'gname': return this.compare(a[1].people[0].fullName, b[1].people[0].fullName, isAsc);
        case 'gage': return this.compare(a[1].people[0].currentAge, b[1].people[0].currentAge, isAsc);
        case 'gposition': return this.compare(a[1].people[0].primaryPosition.name, b[1].people[0].primaryPosition.name, isAsc);
        case 'gbirthcity': return this.compare(a[1].people[0].birthCity, b[1].people[0].birthCity, isAsc);
        case 'gbirthcountry': return this.compare(a[1].people[0].birthCountry, b[1].people[0].birthCountry, isAsc);
        case 'ggp': return this.compare(a[0].stats[0].splits[0].stat.games, b[0].stats[0].splits[0].stat.games, isAsc);
        case 'win': return this.compare(a[0].stats[0].splits[0].stat.wins, b[0].stats[0].splits[0].stat.wins, isAsc);
        case 'loss': return this.compare(a[0].stats[0].splits[0].stat.losses, b[0].stats[0].splits[0].stat.losses, isAsc);
        case 'ot': return this.compare(a[0].stats[0].splits[0].stat.ot, b[0].stats[0].splits[0].stat.ot, isAsc);
        case 'so': return this.compare(a[0].stats[0].splits[0].stat.shutouts, b[0].stats[0].splits[0].stat.shutouts, isAsc);
        case 'gaa': return this.compare(a[0].stats[0].splits[0].stat.goalsAgainstAverage, b[0].stats[0].splits[0].goalsAgainstAverage.shots, isAsc);
        case 'sv': return this.compare(a[0].stats[0].splits[0].stat.savePercentage, b[0].stats[0].splits[0].stat.savePercentage, isAsc);
        case 'esv': return this.compare(a[0].stats[0].splits[0].stat.evenStrengthsavePercentage, b[0].stats[0].splits[0].stat.evenStrengthsavePercentage, isAsc);
        case 'shsv': return this.compare(a[0].stats[0].splits[0].stat.shortHandedSavePercentage, b[0].stats[0].splits[0].stat.shortHandedSavePercentage, isAsc);
        case 'gtoig': return this.compare(a[0].stats[0].splits[0].stat.timeOnIcePerGame, b[0].stats[0].splits[0].stat.timeOnIcePerGame, isAsc);

        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}