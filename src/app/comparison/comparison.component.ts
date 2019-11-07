import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Team, Roster, Player, Stats } from '../team.model'

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  optionList: any[] = ["Favour Offense", "Favour Defense", "Favour PP", "Favour SH"]
  players: any
  playerData: any
  teamList: any
  teamArray: Team[] = new Array()
  team1Players: Roster[] = new Array()
  team2Players: Roster[] = new Array()
  player1Data: any
  goalie1Data: any
  player2Data: any
  goalie2Data: any
  playerAdv: any
  compare1Result: any
  compare2Result: any
  compareConfidence: any
  player1points: any = 0
  player2points: any = 0
  chkOffense: boolean = false
  chkDefense: boolean = false
  chkPP: boolean = false
  chkSH: boolean = false

  constructor(private data: DataService) { }

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

     this.getTeam1(24)

     this.getTeam2(24)

     console.log(this.teamArray)
     console.log(this.team1Players)
     console.log(this.team2Players)
  }

  getTeam1(id: number){
    this.data.getRoster(id).subscribe(res => {
      this.players = res;
      var i = 0
      this.players.roster.forEach(element => {
        this.team1Players[i] = element
        i++   
      }); 
    });
  }

  getTeam2(id: number){
    this.data.getRoster(id).subscribe(res => {
      this.players = res;
      var i = 0
      this.players.roster.forEach(element => {
        this.team2Players[i] = element
        i++   
      }); 
    });
  }

  getPlayer1(id: number){
    this.goalie1Data = null
    this.player1Data = null
    this.data.getTotalPlayer(id).subscribe(res => {
      this.playerData = res
      //if stats cant be retrieved... possible case when roster player has 0gp
      if (this.playerData[0].stats[0].splits.length == 0){
      }else{
        if (this.playerData[1].people[0].primaryPosition.code == "G"){
          this.goalie1Data = res
        }else{
          this.player1Data = res
          this.comparePlayers()
        }    
      }
    });  
  }

  getPlayer2(id: number){
    this.goalie2Data = null
    this.player2Data = null
    this.data.getTotalPlayer(id).subscribe(res => {
      this.playerData = res
      //if stats cant be retrieved... possible case when roster player has 0gp
      if (this.playerData[0].stats[0].splits.length == 0){
      }else{
        if (this.playerData[1].people[0].primaryPosition.code == "G"){
          this.goalie2Data = res
        }else{
          this.player2Data = res
          this.comparePlayers()
        }    
      } 
    });
  }

  comparePlayers(){
    console.log(this.chkOffense + " " + this.chkDefense + " " + this.chkPP + " " + this.chkSH)
    this.player1points = 0
    this.player2points = 0

    var offenseMod = 1, defenseMod = 1, shMod = 1, ppMod = 1

    if (this.chkOffense == true){ offenseMod = 1.5 }
    if (this.chkDefense == true){ defenseMod = 1.5 }
    if (this.chkPP == true){ ppMod = 1.5 }
    if (this.chkSH == true){ shMod = 1.5 }

    if ((this.player1Data && this.player2Data) || (this.goalie1Data && this.goalie2Data)){
      
      //compare goals
      if (this.player1Data[0].stats[0].splits[0].stat.goals > this.player2Data[0].stats[0].splits[0].stat.goals){
        this.player1points += 1 * offenseMod
      }else if (this.player1Data[0].stats[0].splits[0].stat.goals > this.player2Data[0].stats[0].splits[0].stat.goals){
        this.player2points += 1 * offenseMod
      }

      //compare assists
      if (this.player1Data[0].stats[0].splits[0].stat.assists > this.player2Data[0].stats[0].splits[0].stat.assists){
        this.player1points += 1 * offenseMod
      }else if (this.player1Data[0].stats[0].splits[0].stat.assists < this.player2Data[0].stats[0].splits[0].stat.assists){
        this.player2points += 1 * offenseMod
      }

      //compare points
      if (this.player1Data[0].stats[0].splits[0].stat.points > this.player2Data[0].stats[0].splits[0].stat.points){
        this.player1points += 1 * offenseMod
      }else if (this.player1Data[0].stats[0].splits[0].stat.points < this.player2Data[0].stats[0].splits[0].stat.points){
        this.player2points += 1 * offenseMod
      }

      //compare ppg
      if ((this.player1Data[0].stats[0].splits[0].stat.points/this.player1Data[0].stats[0].splits[0].stat.games) > (this.player2Data[0].stats[0].splits[0].stat.points/this.player2Data[0].stats[0].splits[0].stat.games)){
        this.player1points += 1 * offenseMod
      }else if ((this.player1Data[0].stats[0].splits[0].stat.points/this.player1Data[0].stats[0].splits[0].stat.games) < (this.player2Data[0].stats[0].splits[0].stat.points/this.player2Data[0].stats[0].splits[0].stat.games)){
        this.player2points += 1 * offenseMod
      }

      //compare shots
      if (this.player1Data[0].stats[0].splits[0].stat.shots > this.player2Data[0].stats[0].splits[0].stat.shots){
        this.player1points += 1 * offenseMod
      }else if (this.player1Data[0].stats[0].splits[0].stat.shots > this.player2Data[0].stats[0].splits[0].stat.shots){
        this.player2points += 1 * offenseMod
      }

      //compare sh%
      if (this.player1Data[0].stats[0].splits[0].stat.shotPct > this.player2Data[0].stats[0].splits[0].stat.shotPct){
        this.player1points += 1 * offenseMod
      }else if (this.player1Data[0].stats[0].splits[0].stat.shotPct > this.player2Data[0].stats[0].splits[0].stat.shotPct){
        this.player2points += 1 * offenseMod
      }

      this.playerAdv = this.player1points - this.player2points
      console.log(this.playerAdv)

      if (this.playerAdv > 2){
        this.compare1Result = "Much Better"
        this.compare2Result = "Much Worse"
      }else if (this.playerAdv > 1){
        this.compare1Result = "Slightly Better"
        this.compare2Result = "Slightly Worse"
      }else if (this.playerAdv > 0){
        this.compare1Result = "Too Close to Call"
        this.compare2Result = "Too Close to Call"
      }else if (this.playerAdv == 0){
        this.compare1Result = "Even"
        this.compare2Result = "Even"
      }else if (this.playerAdv > -2){
        this.compare1Result = "Too Close to Call"
        this.compare2Result = "Too Close to Call"
      }else if (this.playerAdv > -3){
        this.compare1Result = "Slightly Worse"
        this.compare2Result = "Slightly Better"
      }else if (this.playerAdv > -40){
        this.compare1Result = "Much Worse"
        this.compare2Result = "Much Better"
      }else{
        this.compare1Result = "Inconclusive"
        this.compare2Result = "Inconclusive"
      }
    }
  }

}
