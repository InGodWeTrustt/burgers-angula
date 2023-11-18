import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  currency = "$";

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData = [
    {
      "title": "Бургер чеддер & бекон",
      "price": 8,
      "basePrice": 8,
      "text": "Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус",
      "image": "1.png",
      "grams": 360
    },
    {
      "title": "BBQ с беконом и курицей",
      "price": 7,
      "basePrice": 7,
      "text": "Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ",
      "image": "2.png",
      "grams": 390
    },
    {
      "title": "Дабл биф бургер",
      "price": 10,
      "basePrice": 10,
      "text": "Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук,соус бургер, горчица",
      "image": "3.png",
      "grams": 420
    },
    {
      "title": "Баварский бургер",
      "price": 7,
      "basePrice": 7,
      "text": "Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг",
      "image": "4.png",
      "grams": 220
    },
    {
      "title": "Бекон чизбургер",
      "price": 8,
      "basePrice": 8,
      "text": "Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень",
      "image": "5.png",
      "grams": 220
    },
    {
      "title": "Индиана бургер",
      "price": 9,
      "basePrice": 9,
      "text": "Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень",
      "image": "6.png",
      "grams": 320
    },
    {
      "title": "Вегги бургер",
      "price": 8,
      "basePrice": 8,
      "text": "Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг",
      "image": "7.png",
      "grams": 280
    },
    {
      "title": "Плаксивый Джо",
      "price": 7,
      "basePrice": 7,
      "text": "Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень",
      "image": "8.png",
      "grams": 380
    },
    {
      "title": "Двойной чиз бургер",
      "price": 11,
      "basePrice": 11,
      "text": "Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень",
      "image": "9.png",
      "grams": 400
    },
    {
      "title": "Фрешбургер",
      "price": 9,
      "basePrice": 9,
      "text": "Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат",
      "image": "10.png",
      "grams": 300
    },
    {
      "title": "Цуккини бургер",
      "price": 8,
      "basePrice": 8,
      "text": "Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень",
      "image": "11.png",
      "grams": 320
    },
    {
      "title": "Двойной бургер чеддар",
      "price": 9,
      "basePrice": 9,
      "text": "Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень",
      "image": "12.png",
      "grams": 360
    }
  ];

  constructor(private fb: FormBuilder) { }

  scrollTo(target: HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" })
  }

  confirmOrder() {
    if (this.form.valid) {
      alert('Все ок с формой')
      this.form.reset()
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
}
