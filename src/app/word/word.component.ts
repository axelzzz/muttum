import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Word } from '../services/data.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordComponent {
  private platform = inject(Platform);
  @Input() word?: Word;
  isIos() {
    return this.platform.is('ios')
  }
}
