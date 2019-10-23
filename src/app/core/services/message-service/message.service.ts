import { Injectable } from '@angular/core';
import { Message } from '../../types/message';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../../common/constants';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  _messageList$ = new BehaviorSubject(new Array<Message>());
  _maxType$ = new BehaviorSubject<number>(null);

  constructor() {
  }
  public addInfo(subject: string, body: string) {
    const message: Message = {
      subject, body, type: Constants.MessageType.Information
    };
    this.addMessage(message);
  }
  public addWarning(subject: string, body: string) {
    const message: Message = {
      subject, body, type: Constants.MessageType.Warning
    };
    this.addMessage(message);
  }
  public addError(subject: string, error: any) {
    let body: string = null;
    if (error.message) {
      body += error.message;
    }
    if (error.stack) {
      body += error.stack;
    }
    if (error.error) {
      body += error.error;
    }
    if (!body) {
      body = error;
    }
    const message: Message = {
      subject, body, type: Constants.MessageType.Error
    };
    this.addMessage(message);
  }
  public addMessage(message: Message) {

    const currentValue = this._messageList$.value;
    const updatedValue = [...currentValue, message];
    this._messageList$.next(updatedValue);
    if (message.type > this._maxType$.value) {
      this._maxType$.next(message.type);
    }
  }
  public removeMessage(index: number) {
    // const index: number = this._messageList$.value.indexOf(message);
    if (index !== -1) {
        const currentValue = this._messageList$.value;
        currentValue.splice(index, 1);
        this._messageList$.next(currentValue);
    }
    let maxType = null;
    this._messageList$.value.forEach((m: Message) => {
      if (m.type > maxType) {
        maxType = m.type;
      }
    });
    this._maxType$.next(maxType);
  }
  public clear() {
    this._messageList$.next(new Array<Message>());
    this._maxType$.next(null);
  }
  public get messageList() {
    return this._messageList$.value;
  }
  public get messageList$() {
    return this._messageList$.asObservable();

  }
  public get maxType() {
    return this._maxType$.value;
  }
  public get maxType$() {
    return this._maxType$.asObservable();
  }
}
