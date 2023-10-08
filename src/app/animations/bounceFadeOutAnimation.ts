import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const bounceFadeOutAnimation = trigger('bounceFadeOutAnimation', [
  state('void', style({
    opacity: 0,
    transform: 'scale(1)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  transition(':enter', [
    animate('0.5s ease-out', keyframes([
      style({ transform: 'scale(0.5)', opacity: 0, offset: 0 }),
      style({ transform: 'scale(1.2)', opacity: 0.5, offset: 0.5 }),
      style({ transform: 'scale(1)', opacity: 1, offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('0.5s ease-in', style({ opacity: 0 }))
  ])
]);
