export class Notification {
    constructor() {
        this.isVolatile = false;
        this.seen = false;
    }
    /**
     * Create a full Notification from a VolatileNotification by generating missing properties.
     * @param vn The VolatileNotification to be converted
     * @returns full Notification object with auto-generated id and eventTime
     */
    static fromVolatile(vn) {
        const notification = new Notification();
        notification.messages = [vn.message];
        notification.type = vn.type;
        notification.id = Date.now();
        notification.eventTime = new Date().toISOString();
        notification.sticky = false;
        notification.isVolatile = true;
        return notification;
    }
    static isVolatileNotification(n) {
        const notification = n;
        return notification.id === undefined && notification.eventTime === undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWFwcC11aS9ub3RpZmljYXRpb24tY2VudGVyL3NyYy9saWIvc2hhcmVkL21vZGVscy9ub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsTUFBTSxPQUFPLFlBQVk7SUFBekI7UUFXRSxlQUFVLEdBQUksS0FBSyxDQUFDO1FBQ3BCLFNBQUksR0FBSSxLQUFLLENBQUM7SUF1QmhCLENBQUM7SUFyQkM7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBd0I7UUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxZQUFZLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztRQUM1QixZQUFZLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEQsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFL0IsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFzQztRQUNsRSxNQUFNLFlBQVksR0FBRyxDQUFpQixDQUFDO1FBQ3ZDLE9BQU8sWUFBWSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksWUFBWSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUM7SUFDL0UsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2UnO1xyXG5pbXBvcnQgeyBWb2xhdGlsZU5vdGlmaWNhdGlvbiB9IGZyb20gJy4vdm9sYXRpbGUtbm90aWZpY2F0aW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvblR5cGUgPSAnRVJST1InIHwgJ1dBUk5JTkcnIHwgJ1NVQ0NFU1MnIHwgJ0NPVU5URE9XTicgfCAnSU5GTycgfCAnTkVXUyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbkF1ZGllbmNlIHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGN1c3RvbWVySWQ6IHN0cmluZztcclxuICB1c2VySWQ6IHN0cmluZztcclxuICBkYXRhY2VudGVyOiBzdHJpbmc7XHJcbiAgZGF0YWJhc2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0eXBlOiBOb3RpZmljYXRpb25UeXBlO1xyXG4gIGV2ZW50VGltZTogc3RyaW5nO1xyXG4gIHVwZGF0ZVRpbWU/OiBzdHJpbmc7XHJcbiAgZXhwaXJ5VGltZT86IHN0cmluZztcclxuICBzb3VyY2U/OiBzdHJpbmc7XHJcbiAgc3RpY2t5OiBib29sZWFuO1xyXG4gIG1lc3NhZ2VzOiBNZXNzYWdlW107XHJcbiAgYXVkaWVuY2VzPzogTm90aWZpY2F0aW9uQXVkaWVuY2VbXTtcclxuICBlcnJvckRldGFpbHM/OiB1bmtub3duO1xyXG4gIGlzVm9sYXRpbGU/ID0gZmFsc2U7XHJcbiAgc2Vlbj8gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZnVsbCBOb3RpZmljYXRpb24gZnJvbSBhIFZvbGF0aWxlTm90aWZpY2F0aW9uIGJ5IGdlbmVyYXRpbmcgbWlzc2luZyBwcm9wZXJ0aWVzLlxyXG4gICAqIEBwYXJhbSB2biBUaGUgVm9sYXRpbGVOb3RpZmljYXRpb24gdG8gYmUgY29udmVydGVkXHJcbiAgICogQHJldHVybnMgZnVsbCBOb3RpZmljYXRpb24gb2JqZWN0IHdpdGggYXV0by1nZW5lcmF0ZWQgaWQgYW5kIGV2ZW50VGltZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBmcm9tVm9sYXRpbGUodm46IFZvbGF0aWxlTm90aWZpY2F0aW9uKTogTm90aWZpY2F0aW9uIHtcclxuICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24oKTtcclxuICAgIG5vdGlmaWNhdGlvbi5tZXNzYWdlcyA9IFt2bi5tZXNzYWdlXTtcclxuICAgIG5vdGlmaWNhdGlvbi50eXBlID0gdm4udHlwZTtcclxuICAgIG5vdGlmaWNhdGlvbi5pZCA9IERhdGUubm93KCk7XHJcbiAgICBub3RpZmljYXRpb24uZXZlbnRUaW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgbm90aWZpY2F0aW9uLnN0aWNreSA9IGZhbHNlO1xyXG4gICAgbm90aWZpY2F0aW9uLmlzVm9sYXRpbGUgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBub3RpZmljYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaXNWb2xhdGlsZU5vdGlmaWNhdGlvbihuOiBOb3RpZmljYXRpb24gfCBWb2xhdGlsZU5vdGlmaWNhdGlvbik6IG4gaXMgVm9sYXRpbGVOb3RpZmljYXRpb24ge1xyXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uID0gbiBhcyBOb3RpZmljYXRpb247XHJcbiAgICByZXR1cm4gbm90aWZpY2F0aW9uLmlkID09PSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLmV2ZW50VGltZSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iXX0=