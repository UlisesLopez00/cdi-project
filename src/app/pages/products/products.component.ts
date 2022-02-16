import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor() {}
  public alerta: any = {};
  public cdb: any = '';
  public descripcion: string = '';
  public precio?: number;
  public cantidad?: number;
  public files: NgxFileDropEntry[] = [];

  ngOnInit(): void {}

  public focus(id: any) {
    document.getElementById(id)?.focus();
  }

  public registrar() {
    let data = {
      cdb: this.cdb,
      descripcion: this.descripcion,
      precio: this.precio,
      cantidad: this.cantidad,
    };
    if (!this.cdb || !this.descripcion || !this.precio || !this.cantidad) {
      console.log('Error');

      this.alerta = {
        show: true,
        msg: 'Todos los campos son obligatorios',
        color: '#FFCC00',
      };
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          let img = document.createElement('img');
          let base64: any = await this.toBase64(file);
          img.setAttribute('src', base64.toString());
          img.setAttribute('style', 'width:25%;height:200px');
          let divPreview = document.getElementById('upload-preview');
          divPreview?.appendChild(img);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    // console.log(event);
  }

  public fileLeave(event: any) {
    // console.log(event);
  }
  public toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
}
