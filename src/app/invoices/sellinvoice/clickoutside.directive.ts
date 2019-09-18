import { Directive, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[Clickoutside]'
})
export class ClickoutsideDirective {
  @Output() public clickOutside = new EventEmitter();

  constructor(private _elementRef: ElementRef) { }

  @HostListener('document"click', ['$event.target'])

  public onClick(targetElement) {
    if (targetElement.id == "ProdName") { return; }
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
