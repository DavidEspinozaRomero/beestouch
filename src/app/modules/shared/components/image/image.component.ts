import { Component, Input, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit {
  @Input() src = 'logo.jpg';
  @Input() alt = 'no se encontro imagen del producto';
  @Input() classes = '';
  @Input() isProduct = false;
  @Input() hasPriority = false;

  #baseDir: string = '../../../../../assets/';
  imgData = {
    src: '',
    alt: '',
  };

  ngOnInit() {
    this.imgData.alt = this.alt;
    this.imgData.src = this.#baseDir + 'imgs/products/' + this.src;
  }
}
