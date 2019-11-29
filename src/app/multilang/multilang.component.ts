import { Component, OnInit } from '@angular/core';
import { MultilangService } from '../multilang.service';

@Component({
  selector: 'app-multilang',
  templateUrl: './multilang.component.html',
  styleUrls: ['./multilang.component.css']
})
export class MultilangComponent implements OnInit {

  multiLang = {}
  title = "sagar";

  constructor(
    private multilangService: MultilangService
  ) { }

  ngOnInit() {
    this.multilangService.getListOfMultiLangNames(this.title).subscribe(data => {
      console.log(data)
      this.multiLang = data;
    })
  }

}
