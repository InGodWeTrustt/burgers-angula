import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { AppService } from './app.service';

interface IModal {
  isOpen: boolean
  responseMsg: string
}

interface IProduct {
  image: string
  basePrice: number
  price: number
  grams: number
  text: string
  title: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  currency: string = "$";

  modal: IModal = {
    isOpen: false,
    responseMsg: ''
  }

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  // данные, которые мы будем получать от сервера
  productsData: IProduct[] = [];

  constructor(private fb: FormBuilder, private appSevice: AppService) { }

  ngOnInit() {
    this.appSevice.getData().subscribe((data: any) => {
      this.productsData = data
    })
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({ behavior: "smooth" })
    if (burger) {
      this.form.patchValue({ order: burger.title + ' (' + burger.price + ' ' + this.currency + ')' });
    }
  }

  confirmOrder() {
    if (this.form.valid) {

      // отправляем данные формы на бекенд
      this.appSevice.sendOrder(this.form.value).subscribe(
        {
          next: (response: any) => {
            // Если запрос отправился успешно. Показываем модальное окно
            this.modal.isOpen = true;
            this.modal.responseMsg = response.message;
            // Очищаем поля формы
            this.form.reset();
          },
          error: response => {
            // Если возникла ошибка
            alert(response.error.message)
          }
        }
      );
    }
  }

  changeCurrency() {
    let newCurrency = '$'
    let coefficient = 1;
    if (this.currency === "$") {
      newCurrency = '₽';
      coefficient = 80;
    } else if (this.currency == "₽") {
      newCurrency = "BYN";
      coefficient = 3;
    } else if (this.currency === 'BYN') {
      newCurrency = '€';
      coefficient = 0.9;
    } else if (this.currency === '€') {
      newCurrency = '¥';
      coefficient = 6.9;
    }

    this.currency = newCurrency;

    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * coefficient).toFixed(1)
    })
  }

  closeModal() {
    this.modal.isOpen = !this.modal.isOpen;
    this.modal.responseMsg = '';
  }
}
