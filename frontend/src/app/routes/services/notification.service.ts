import { Injectable } from '@angular/core';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  async managementToast(
    element: string,
    validRequest: boolean,
    message: string,
    error?: ResponseError
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show';
        toastMsg.innerHTML = `<div class="fixed z-10 flex justify-center items-center m-auto top-8 left-0 right-0 w-fit h-12 bg-darkBlue-400 rounded-lg shadow-md p-4 text-xs text-darkBlue-300"><span style="color:green;" class="material-icons scale-75 mr-2">check_circle</span>${message}</div>`;
        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show';
        if (error?.messageDetail) {
          toastMsg.innerHTML = `<div class="fixed z-10 flex justify-center items-center m-auto top-8 left-0 right-0 w-fit h-12 bg-darkBlue-400 rounded-lg shadow-md p-4 text-xs text-darkBlue-300"><span style="color:red;" class="material-icons scale-75 mr-2">error</span>${message}. Message: ${error?.message}. Message detail: ${error?.messageDetail}. Status code: ${error?.statusCode}</div>`;
        } else {
          toastMsg.innerHTML = `<div class="fixed z-10 flex justify-center items-center m-auto top-8 left-0 right-0 w-fit h-12 bg-darkBlue-400 rounded-lg shadow-md p-4 text-xs text-darkBlue-300"><span style="color:red;" class="material-icons scale-75 mr-2">error</span>${message}, show logs. Message: ${error?.message}. Status code: ${error?.statusCode}</div>`;
        }

        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error('path:', error.path);
    console.error('timestamp:', error.timestamp);
    console.error('message:', error.message);
    console.error('messageDetail:', error.messageDetail);
    console.error('statusCode:', error.statusCode);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
