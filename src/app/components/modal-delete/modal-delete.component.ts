import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostModel } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDeleteComponent implements OnInit {

  @Input() post!: PostModel;
  @Input() showModal: boolean | undefined;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContent') modalContentRef: ElementRef | undefined;
  modalRef: NgbModalRef | undefined;

  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.showModal) {
      this.openModal();
    } else {
      this.modalRef?.close();
    }
  }

  openModal() {
    this.modalRef = this.modalService.open(this.modalContentRef, {
      centered: true,
      modalDialogClass: 'delete-modal',
      //backdrop: 'static',
      // keyboard: false,
      beforeDismiss: () => {
        this.handleClose();
        return true;
      },
    });
  }

  handleClose() {
    this.modalRef?.close();
    this.close.emit();
  }

  handleSubmit() {
    this.confirmDelete.emit();
    this.handleClose();
  }
}
