import {  Component, HostListener, OnInit, AfterViewInit} from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';
import { ImportService } from './shared/services/import.service';
import { SearchService } from './shared/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  private observer!: IntersectionObserver;

  constructor(public scrollService: ScrollService, public importService: ImportService, public searchService: SearchService){
  }

  ngOnInit() {
    // Initialize Intersection Observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger a bit before the element fully enters view
    });
  }

  ngAfterViewInit() {
    // Observe all grid items
    const gridItems = document.querySelectorAll('.div1, .div2, .div3, .div4, .div5, .div6, .div7, .div8, .div9, .div10');
    gridItems.forEach(item => {
      this.observer.observe(item);
    });

    // Try multiple times to find and setup the image tilt effect
    this.setupImageTiltEffectWithRetry();
  }

  private setupImageTiltEffectWithRetry(attempts: number = 0) {
    const maxAttempts = 10;
    const delay = 100;

    console.log(`Attempt ${attempts + 1} to find images...`);

    // Find all images with rotateAnimation class
    const images = document.querySelectorAll('.rotateAnimation') as NodeListOf<HTMLElement>;

    if (images.length > 0) {
      console.log(`Found ${images.length} images with rotateAnimation class:`, images);
      this.setupImageTiltEffect();
    } else if (attempts < maxAttempts) {
      console.log(`No images found, retrying in ${delay}ms...`);
      setTimeout(() => {
        this.setupImageTiltEffectWithRetry(attempts + 1);
      }, delay);
    } else {
      console.error('Failed to find any rotateAnimation images after maximum attempts');
    }
  }

  private setupImageTiltEffect() {
    // Find all images with rotateAnimation class
    const images = document.querySelectorAll('.rotateAnimation') as NodeListOf<HTMLElement>;

    console.log(`Setting up tilt effect for ${images.length} images`);

    if (images.length === 0) {
      console.error('No images with rotateAnimation class found!');
      return;
    }

    images.forEach((image, index) => {
      console.log(`Setting up image ${index + 1}:`, image);

      // Test if the image is actually visible and has dimensions
      const rect = image.getBoundingClientRect();
      console.log(`Image ${index + 1} dimensions:`, rect.width, 'x', rect.height);

      if (rect.width === 0 || rect.height === 0) {
        console.warn(`Image ${index + 1} has no dimensions, skipping...`);
        return;
      }

      // Set initial values
      image.style.setProperty('--rotateX', '0deg');
      image.style.setProperty('--rotateY', '0deg');
      image.style.setProperty('--scale', '1');

      // Add a test click event to verify event handling works
      image.addEventListener('click', () => {
        console.log(`Image ${index + 1} clicked - events are working!`);
      });

      image.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position (max 6 degrees for subtle effect)
        const rotateX = (y - centerY) / centerY * -6; // Tilt up/down (inverted)
        const rotateY = (x - centerX) / centerX * 6;  // Tilt left/right

        // Update CSS variables with subtle effects
        image.style.setProperty('--rotateX', `${rotateX}deg`);
        image.style.setProperty('--rotateY', `${rotateY}deg`);
        image.style.setProperty('--scale', '1.02'); // Reduced scale for subtlety
      });

      image.addEventListener('mouseleave', () => {
        image.style.setProperty('--rotateX', '0deg');
        image.style.setProperty('--rotateY', '0deg');
        image.style.setProperty('--scale', '1');
      });

      image.addEventListener('mouseenter', () => {
        console.log(`Mouse entered image ${index + 1}`);
      });
    });

    console.log(`All ${images.length} images set up with tilt effect successfully!`);
  }

  scrollTop() {
    window.scrollTo(0,0);
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollService.updateScrollPosition();
  }

  @HostListener('window:keydown.control.alt.s', ['$event'])
  searchShortListener(event: KeyboardEvent) {
    event.preventDefault();
    this.searchService.toggleSearch();
  }

  @HostListener('window:keydown.esc', ['$event'])
  escListener(event: KeyboardEvent) {
    event.preventDefault();
    this.searchService.disableSearch();
  }

}
