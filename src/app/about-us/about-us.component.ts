import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { Meta } from '@angular/platform-browser';
import { GtmService } from '../services/gtm.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public countEvents: any;

  @ViewChild('timelineScroll') timelineScrollRef!: ElementRef;

  private isDragging = false;
  private dragStartX = 0;
  private dragScrollLeft = 0;

  readonly startPad = 80;
  readonly dotSpacing = 250;

  storyEvents = [
    { date: '2019', titleKey: 'about.story.events.1.title' },
    { date: '2020', titleKey: 'about.story.events.2.title' },
    { date: '2021', titleKey: 'about.story.events.3.title' },
    { date: '2022', titleKey: 'about.story.events.4.title' },
    { date: '2023', titleKey: 'about.story.events.5.title' },
    { date: '2024', titleKey: 'about.story.events.6.title' },
  ];

  get totalWidth(): number {
    return this.startPad + (this.storyEvents.length - 1) * this.dotSpacing + 110;
  }

  constructor(private eventservice: EventService, private meta: Meta, private gtmService: GtmService) { }

  ngOnInit(): void {
    this.getCountEvent();
    this.allTags();
    this.trackMe();
  }

  getCountEvent() {
    this.eventservice.getCountEvents().subscribe((data) => {
      this.countEvents = data;
    });
  }

  private allTags() {
    this.meta.updateTag({ name: 'title', content: 'Association France/Japon. Participez à nos échanges de langue à Paris ou à Tokyo.' });
    this.meta.updateTag({ name: 'description', content: 'Gengoffee est une association franco-japonaise qui permet à ses participants de rencontrer des Japonais ou anglophones lors de ses échanges de langue à Paris ou à Tokyo.' });
  }

  trackMe() {
    this.gtmService.trackMe('page-about-us', 'about-us', 'about-us-page');
  }

  onMouseDown(e: MouseEvent): void {
    const el = this.timelineScrollRef.nativeElement;
    this.isDragging = true;
    this.dragStartX = e.pageX - el.getBoundingClientRect().left;
    this.dragScrollLeft = el.scrollLeft;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;
    e.preventDefault();
    const el = this.timelineScrollRef.nativeElement;
    const x = e.pageX - el.getBoundingClientRect().left;
    el.scrollLeft = this.dragScrollLeft - (x - this.dragStartX);
  }

  onMouseUp(): void {
    this.isDragging = false;
  }
}
