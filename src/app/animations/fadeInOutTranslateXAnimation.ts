import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInOutTranslateXAnimation = trigger('fadeInOutTranslateY', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(-100%)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition(':enter', [
    animate('0.5s ease-in-out')
  ]),
  transition(':leave', [
    animate('0.5s ease-in-out')
  ]),
]);
