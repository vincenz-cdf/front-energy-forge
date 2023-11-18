import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'energy-forge-front';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['paymentSuccess'] === 'true') {
        const qty = params['qty'];
        this.showSuccessAlert(qty);
        // Navigate to the same route without query parameters
        this.router.navigate(['/']);
      }
    });
  }

  showSuccessAlert(qty: string) {
    Swal.fire({
      title: 'Purchase Successful',
      html: `You have purchased ${qty}
      <img src="../assets/sprites/ui/diamond.png" alt="diamonds" width="25"> 
      `,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }
}
