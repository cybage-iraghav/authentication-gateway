# Notification Center Component

## Summary

This is an angular component for consuming notifications from [notification service](https://gitlab01.muc.ecircle.de/notification-center/nc-service)

## Install
Inside your Angular app run  
`npm install @mapp-ui/notification-center`

### Add component
* Import Notification Center in app module
    Example:
    ```typescript
    import { NotificationCenterModule } from '@mapp-ui/notification-center';

    @NgModule({
      imports: [
        NotificationCenterModule
      ]
    })
    ```

* Add component markup
    Notification center component needs to be added in you app component like this  
    `<mui-notification-center></mui-notification-center>`

### Connect to the nc-service API
Connection parameters for the nc-service API need to be provided by consuming application, because they are 
dependent on runtime context. Token __NC_API_CONFIG__ needs to be provided, giving a value which is 
following the shape defined in ApiConfigOptions. The UI component supports two connection modes: direct or cep.

* Direct connection  
    Connection is made directly to nc-service API. You might need to use a reverse proxy config to bypass cross-domain
    restrictions.  
    Revisiting the example above, a configuration could look like this
    ```typescript
    import { NotificationCenterModule, NC_API_CONFIG } from '@mapp-ui/notification-center';

    const apiConfig = <ApiConfigOptions>{
        connectionMode: 'direct',
        baseUrl: '/rest/notifications/',
        userInfo: {
          userId: 1000,
          customerId: 123,
          database: 'pos1',
          datacenter: 'l3',
          locale: 'en'
        }
    };

    @NgModule({
      imports: [
        NotificationCenterModule
      ],
      providers: [
        { provide: NC_API_CONFIG, useValue: apiConfig }      
      ]
    })
    
    ```
* Connect via CEP API endpoint  
    CEP also provides some endpoints which allow fetching notifications conveniently. In this case, only the 
    sessionId is needed and CEP will provide the remaining parameters for you.  
    Example:
    ```typescript
    import { NotificationCenterModule, NC_API_CONFIG } from '@mapp-ui/notification-center';

    const apiConfig = <ApiConfigOptions>{
        connectionMode: 'cep',
        baseUrl: 'https://mycepdomain/services/dmc/notifications/',
        sessionId: ';jsessionid=5CC2EFC2D33F5EDBBD77E586B4D131FF;apw12'
    };

    @NgModule({
      imports: [
        NotificationCenterModule
      ],
      providers: [
        { provide: NC_API_CONFIG, useValue: apiConfig }      
      ]
    })

    ```
    In case the values for the API Config need to be determined dynamically, you need to use the factory provider pattern.
    Otherwise the provided object will be null when injected into the service. (At least when you are using AOT in your build)

* UI only mode
    NC supports working without connection to a backend API. If this should be your desired operation mode, you can skip
    providing NC_API_CONFIG token.

### Creating 'volatile' notifications
A volatile notification can be triggered directly from the UI in cases where your app does need to notify the user about
something. The easiest way is to use the NotificationService for that purpose, which you can get by Angular DI once you 
have imported the module.

When creating a volatile notification, you can choose to have either just a snackbar notification or snackbar + 
detailed message in the notification panel. This is controlled by the properties present on the message object. If only
headline is used, there will only be the snackbar. If you supply both headline and body properties, snackbar and panel
notification will be created.

Generally body context will be treated as plain text. But you can use an additional boolean property "htmlContent" 
to treating body as html content. see [DMCP-6191](https://jira.mapp.tools/browse/DMCP-6191)

For details about when to use what, please refer to the [PDM documentation](https://wiki.mapp.tools/x/urH6B)

```typescript
 class AppComponent {
  constructor(private notificationService: NotificationService) {}

  createNotification() {
    const volatileNotification: VolatileNotification = {
      type: 'WARNING',
      message: {
        headline: 'This is a new warning message.'
      }
    };

    this.notificationService.addNotification(notification);
  }   
}
 
```
For more detailed code examples on how to integrate into Angular 2 app, please check out 'Angular 2 demo integration 
project' linked below in Resources.

### Internationalization
The labels used on the Notification Center UI component are available in different languages currently supported by
Engage: EN, ES, IT, FR, DE    

Translation handling is based on the official Angular i18n concepts. Translation files are available in the folder
`i18n` and are part of the distribution. Please make sure to include those files when building your app.


## Resources
* [Source Repository](https://gitlab01.muc.ecircle.de/ui-components/component-library/tree/master/projects/mapp-ui/notification-center)
* [WIKI Space](https://wiki.mapp.tools/x/vALNAw)
