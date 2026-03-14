import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDateClient'
})
export class CreationDateClientPipe implements PipeTransform {

  transform(value: string): unknown {
    const date = new Date(value);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const intervals = [
      { label: 'año',     seconds: 31536000 },
      { label: 'mes',     seconds: 2592000  },
      { label: 'semana',  seconds: 604800   },
      { label: 'día',     seconds: 86400    },
      { label: 'hora',    seconds: 3600     },
      { label: 'minuto',  seconds: 60       },
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        const plural = count > 1 ? this.pluralize(interval.label) : interval.label;
        return `hace ${count} ${plural}`;
      }
    }

    return 'hace un momento';
  }
  private pluralize(label: string): string {
    if (label === 'mes') return 'meses';
    return label + 's';
  }
}
