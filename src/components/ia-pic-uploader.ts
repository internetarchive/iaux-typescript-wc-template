/* eslint-disable */
import { html, css, LitElement, CSSResultGroup } from 'lit';
import { property, customElement, query, state } from 'lit/decorators.js';
import { AccountSettings } from '../styles/account-settings';
import type { FilesModel, URL } from '../models';
// import { FilesModel } from '../../dist/src/models';
import { BackendServiceHandler } from '../services/backend-service';

@customElement('ia-pic-uploader')
export class IAPicUploader extends LitElement {
  @property({ type: String }) previewImg = '';

  @state() private files: FilesModel = {};

  @state() showDropper: boolean = false;
  @state() extendedVersion: boolean = true;

  @query('#drop-region') private dropRegion?: HTMLDivElement;
  @query('#upload-region') private uploadRegion?: HTMLDivElement;
  @query('.profile-section') private profileSection?: HTMLDivElement;
  @query('#image-preview') private imagePreviewRegionId?: HTMLDivElement;
  // @query('.image-preview') private imagePreviewRegion?: HTMLDivElement;
  @query('#save-button') private saveButton?: HTMLDivElement;
  @query('#save-file') private saveFile?: HTMLFormElement;
  @query('#file-dropper') private fileDropper?: HTMLDivElement;
  @query('#self-submit-form') private selfSubmitEle?: HTMLDivElement;
  @query('#file-selector') private fileSelector?: HTMLFormElement;

  bindEvents() {
    this.dropRegion?.addEventListener('dragenter', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragleave', this.preventDefault, false);
    this.dropRegion?.addEventListener('dragover', this.preventDefault, false);
    this.dropRegion?.addEventListener(
      'drop',
      this.handleDrop.bind(this),
      false
    );

    this.saveFile?.addEventListener(
      'submit',
      this.handleSaveFile.bind(this),
      false
    );
  }

  async handleSaveFile(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const response = await BackendServiceHandler({
      action: 'save-account',
      identifier: 'this.identifier',
    });

    return response;
  }

  preventDefault(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  firstUpdated() {
    this.renderInput();
    this.bindEvents();
  }

  render() {
    // console.log(this.showDropper)
    return html`
      <div class="profile-section">
        <div class="overlay-icon">+</div>
        <div id="drop-region" class="image-preview">
          <img src="${this.previewImg}" />
        </div>

        ${this.extendedVersion ? this.selfSubmitForm : ''}
      </div>

      <div id="select-region">
        <div class="select-message">
          Drop a new image onto<br />your picture here or<br />
          <a href="#" id="upload-region">select an image to upload</a>
        </div>
      </div>
    `;
  }

  renderInput() {
    // open file selector when clicked on the drop region
    const fakeInput = document.createElement('input');
    fakeInput.type = 'file';
    fakeInput.accept = 'image/*';
    fakeInput.multiple = false;

    this.dropRegion?.addEventListener('click', () => {
      fakeInput.click();
    });

    this.uploadRegion?.addEventListener('click', () => {
      fakeInput.click();
    });

    fakeInput.addEventListener('change', () => {
      const { files } = fakeInput;
      this.handleFiles(files);
    });
  }

  get selfSubmitForm() {
    return html`
      <div
        id="self-submit-form"
        class="self-submit-form ${this.showDropper ? 'visible' : 'hidden'}"
      >
        <button class="close-button" @click=${() => (this.showDropper = false)}>
          X
        </button>
        <div class="image-preview"></div>
        <form
          method="post"
          id="save-file"
          enctype="multipart/form-data"
          action="/services/post-file.php?submit=1&identifier=@453344354534"
        >
          <input
            id="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <input type="hidden" name="identifier" value="@453344354534" />
          <input
            id="save-button"
            type="submit"
            name="submit"
            value="Submit"
            class="btn btn-success"
            style="display: inline-block;"
            @submit=${this.submitForm}
          />
        </form>
      </div>
    `;
  }

  async submitForm(e: Event) {
    console.log(e.target);

    const response = await BackendServiceHandler({
      action: 'email-available',
      identifier: 'this.identifier',
    });

    return response;
  }

  previewAnduploadImage(image: File) {
    this.showDropper = true;

    // image view container
    // const imgView = document.createElement('div');
    // imgView.className = 'image-preview1';

    // previewing image
    // const img = document.createElement('img');
    // imgView.appendChild(img);

    // pic uploader form
    // const uploaderForm = document.createElement('div');
    // uploaderForm.className = 'self-submit-form';
    // uploaderForm.appendChild(imgView);

    // uploaderForm.innerHTML = this.selfSubmitForm

    // this.profileSection?.appendChild(uploaderForm);

    // this.imagePreviewRegion?.appendChild(imgView);
    // this.profileSection?.appendChild(imgView);
    // this.profileSection?.appendChild(imgView);
    if (this.selfSubmitEle) this.selfSubmitEle.className = 'visible';
    const preview = this.selfSubmitEle?.querySelector('.image-preview');
    // console.log(preview)
    // read the image...
    const img = document.createElement('img');

    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target?.result as string;
    };
    preview?.appendChild(img);

    reader.readAsDataURL(image);
  }

  validateImage(image: File) {
    // check the type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validTypes.indexOf(image.type) === -1) {
      alert('Invalid File Type');
      return false;
    }

    // check the size
    const maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
      alert('File too large');
      return false;
    }

    return true;
  }

  async handleFiles(files: FilesModel | any) {
    // remove previews preview images
    if (true) {
      const imagePreview = this.selfSubmitEle?.querySelector('.image-preview');
      while (
        imagePreview?.firstChild &&
        imagePreview.removeChild(imagePreview.firstChild)
      );
    }
    // while (
    //   this.imagePreviewRegion?.firstChild &&
    //   this.imagePreviewRegion.removeChild(this.imagePreviewRegion.firstChild)
    // );

    if (this.fileSelector) this.fileSelector.files = files;

    if (!files) return;
    for (let i = 0, len = files.length; i < len; i++) {
      if (this.validateImage(files[i]))
        await this.previewAnduploadImage(files[i]);
    }
  }

  handleDrop(event: any) {
    this.preventDefault(event);

    const files = event?.dataTransfer?.files;
    if (files.length) {
      this.handleFiles(files);
    }
  }

  /**
   * CSS
   */
  static get styles(): CSSResultGroup {
    return [
      AccountSettings,
      css`
        .profile-section,
        #select-region {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          position: relative;
        }
        .profile-section. {
          background-color: #fff;
          border-radius: 50%;
          box-shadow: 0 0 35px rgb(0 0 0 / 5%);
          text-align: center;
          cursor: pointer;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
          background-image: url(https://i.ebayimg.com/images/g/LpwAAOSwhcJWF1UM/s-l500.jpg);
          background-size: cover;
        }
        .image-preview:hover {
          box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
          border-radius: 100%;
          opacity: 0.5;
        }

        .overlay-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none;
        }
        .image-preview:hover .overlay-icon {
          display: block;
          z-index: 9;
          color: white;
          font-size: 41px;
          font-weight: bold;
        }
        .overlay-icon i {
          font-size: 22px;
        }
        .image-preview img,
        .image-preview1 img {
          height: 120px;
          width: 120px;
          border-radius: 100%;
          background-size: cover;
          height: 120px;
          width: 120px;
          background-color: rgb(255, 255, 255);
          border-radius: 50%;
          box-shadow: rgb(0 0 0 / 5%) 0px 0px 35px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease 0s;
          position: relative;
          overflow: hidden;
          background-image: url(https://i.ebayimg.com/images/g/LpwAAOSwhcJWF1UM/s-l500.jpg);
          background-size: cover;
        }
        .image-preview1 {
          display: inline-block;
          position: relative;
        }
        .image-preview1 img {
          border-radius: 100%;
          height: 120px;
          width: 120px;
          background: inherit;
        }

        #self-submit-form {
          background: #bcc3c5;
          position: absolute;
          top: 0px;
          width: 150px;
          display: grid;
          height: 250px;
          padding: 11px;
          justify-content: center;
          z-index: 2;
          border: 3px solid rgb(204, 204, 204);
          border-radius: 5px;
          justify-items: center;
        }
        #file-dropper {
          opacity: 0.9;
          filter: alpha(opacity=90);
          border-radius: 10px;
          position: absolute;
          background-color: white;
          color: black;
          z-index: 1;
          border: 3px solid #ccc;
          padding: 10px;
          text-align: center;
          left: 0;
          top: -14px;
          width: 150px;
        }

        .hidden {
          display: none !important;
        }
        .visible {
          display: block;
        }

        #file-selector {
          display: none;
        }

        .close-button {
          position: absolute;
          right: 0;
          top: 0;
        }
      `,
    ];
  }
}
