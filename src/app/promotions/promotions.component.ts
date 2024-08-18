import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promotions: any[] = [];
  codeContrat: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          this.codeContrat = params.get('code_contrat');
          if (this.codeContrat) {
              console.log('code_contrat:', this.codeContrat); // Debugging log
              this.getPromotions();
          } else {
              console.error('code_contrat is null'); // Error log
          }
      });
  }

  getPromotions(): void {
      if (this.codeContrat) {
          this.http.get<any[]>(`http://localhost:8092/api/clients/contrats/${this.codeContrat}/promotions`).subscribe(data => {
              this.promotions = data;
          });
      }
  }

  lastItem(promotion: any): boolean {
      return this.promotions.indexOf(promotion) === this.promotions.length - 1;
  }
}
