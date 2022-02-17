import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { ItemsService } from 'src/app/services/items.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private itemService: ItemsService) {}
  public alerta: any = {};
  public cdb: any = '';
  public descripcion: string = '';
  public precio?: number;
  public cantidad?: number;
  public files: NgxFileDropEntry[] = [];
  public imagenes: any = [];

  ngOnInit(): void {}

  public focus(id: any) {
    document.getElementById(id)?.focus();
  }

  public registrar() {
    let data = {
      _id: this.cdb,
      desc: this.descripcion,
      price: this.precio,
      stock: this.cantidad,
      imgs: this.imagenes,
    };
    if (!this.cdb || !this.descripcion || !this.precio || !this.cantidad) {
      console.log('Error');

      this.alerta = {
        show: true,
        msg: 'Todos los campos son obligatorios',
        color: 'orange',
      };
    } else {
      this.itemService.itemPost(data).subscribe({
        next: (data: any) => {
          this.alerta = {
            show: true,
            msg: 'Producto registrado con exito',
            color: 'green',
          };
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      });
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {
      // Is it a file?
      let extension = droppedFile.fileEntry.name.substring(
        droppedFile.fileEntry.name.lastIndexOf('.') + 1
      );
      console.log(extension);

      if (
        droppedFile.fileEntry.isFile &&
        (extension == 'png' || extension == 'jpeg' || extension == 'jpg')
      ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          if (this.imagenes.length < 4) {
            let img = document.createElement('img');
            let base64: any = await this.toBase64(file);
            img.setAttribute('src', base64.toString());
            img.setAttribute('style', 'width:25%;height:200px');
            img.setAttribute('id', 'imagePreview');
            let divPreview = document.getElementById('upload-preview');
            divPreview?.appendChild(img);
            this.imagenes.push(base64);
          } else {
            this.alerta = {
              show: true,
              msg: 'Solo se pueden subir maximo 4 imagenes',
              color: 'orange',
            };
          }
        });
      } else {
        this.alerta = {
          show: true,
          msg: 'Solo se pueden subir imagenes png,jpg,jpeg',
          color: 'orange',
        };
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
