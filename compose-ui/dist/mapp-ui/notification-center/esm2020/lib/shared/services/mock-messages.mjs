import { DateTime } from 'luxon';
function getEventTime(offset) {
    return DateTime.local().minus({ minutes: offset }).toISO() ?? '';
}
function getId() {
    return Date.now();
}
export function getInitialNotifications() {
    return [
        {
            id: 1,
            type: 'COUNTDOWN',
            eventTime: getEventTime(5),
            expiryTime: DateTime.local().plus({ hours: 4 }).toISO() ?? '',
            sticky: true,
            messages: [
                {
                    id: 1,
                    headline: 'Scheduled maintenance',
                    body: 'System will be down for maintenance. Please plan your work accordingly.',
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com'
                }
            ]
        },
        {
            id: 11,
            type: 'WARNING',
            eventTime: getEventTime(30),
            expiryTime: DateTime.local().plus({ days: 5 }).toISO() ?? '',
            sticky: true,
            messages: [
                {
                    id: 11,
                    headline: 'Slow Imports',
                    body: 'Import speeds in Engage are currently slow. Teams are working on it.',
                    // optionalActionTitle: 'Details',
                    // optionalActionLink: 'http://mapp.com'
                }
            ]
        },
        {
            id: 2,
            eventTime: getEventTime(4),
            type: 'ERROR',
            sticky: false,
            messages: [
                {
                    id: 2,
                    headline: 'Import Job failed',
                    body: '<p><em>The import job with Id 123 failed.<br>The uploaded file was not encoded correctly.<br><br>There has been' +
                        ' an error while connecting to the external resource.            Status code:1234</em></p>',
                    htmlContent: true
                }
            ]
        },
        {
            id: 3,
            eventTime: getEventTime(2),
            type: 'WARNING',
            sticky: false,
            messages: [
                {
                    id: 3,
                    headline: 'This is a warning message',
                    body: 'Please be aware that strange things might happen if you do not read this warning!'
                }
            ]
        },
        {
            id: 4,
            type: 'INFO',
            eventTime: getEventTime(10),
            sticky: false,
            messages: [
                {
                    id: 4,
                    headline: 'Release Information',
                    body: 'Your CEP system has been updated to version 6.90.1940.\nEnjoy all the great new features and bugs!',
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com'
                }
            ]
        },
        {
            id: 5,
            type: 'NEWS',
            eventTime: getEventTime(10),
            sticky: false,
            messages: [
                {
                    id: 5,
                    headline: 'NOW AVAILABLE: Q2 2017 Quarterly Release Recording',
                    body: `We are pleased to announce the availability of the recording of the Q2 2017 Quarterly Release Training
          (Tech Session). Please click on the button below to download the recording and presentation.`,
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com',
                    imageUrl: 'https://picsum.photos/400'
                }
            ]
        },
        {
            id: 6,
            type: 'NEWS',
            eventTime: getEventTime(12),
            sticky: false,
            messages: [
                {
                    id: 6,
                    headline: 'NOW AVAILABLE: Q1 2017 Quarterly Release Recording',
                    body: `We are pleased to announce the availability of the recording of the Q2 2017 Quarterly Release Training
          (Tech Session). Please click on the button below to download the recording and presentation.`,
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com',
                    imageUrl: 'https://picsum.photos/400'
                }
            ]
        },
        {
            id: 7,
            eventTime: getEventTime(14),
            type: 'ERROR',
            sticky: false,
            messages: [
                {
                    id: 7,
                    headline: 'Your new password does not pass the following...',
                    htmlContent: true,
                    body: `<div data-notification-options="{&quot;stripHtml&quot;:false}">
                  <p><em>Your new password does not pass the following security rules:</em></p>
                  <p><em>- Minimum length is 8 characters<br>
                  - Contain at least one upper case letter<br>
                  - Contain at least one number<br>
                  - Contain at least one symbol<br>
                  </em></p>
                </div>`
                }
            ]
        },
        {
            "id": 8,
            "type": "INFO",
            "eventTime": getEventTime(20),
            "source": "ImportMembersJob",
            "messages": [
                {
                    "id": 8,
                    "headline": "Import Report - test_ueep562_050722",
                    "body": "Hello ,\n\n\nyour import had the following results:\n\nNewsletter:            test_ueep562_050722 (test_ueep562_050722@docker01.dmclab.muc.domeus.com)\non:                    05.07.2022 09:25\nduration:              3 seconds\n\nSynchronisation mode:  Add-Update\nwith qualifiers: [Keep Unsubscriptions, Overwrite only Attributes from File]\n\nNew recipients were:   added without message\n\nImport file name:      testLab55_testAndroidUsers050722.csv\nImport file type:      csv\n\nResult overview:\n\nFatal Errors:          -\nProcessed:             2 recipients (AUTO_300129_9868394A9B225B258532FDA3B3FF60FC16ECFE5AD174223B361BF8E5314F9781 (100%))\n\n0 recipients added\n2 recipients updated/replaced\n0 recipients removed\n0 errors\n\n\n\n\n\n\nBest regards, \n\nYour team@docker01.dmclab.muc.domeus.com",
                    "locale": "en",
                    "optionalActionTitle": "Download report",
                    "optionalActionLink": "http://10.128.251.55/home/login.jsp?redirectURL=user/importReport.jsp&repid=382"
                }
            ],
            "audiences": [
                {
                    "id": 1,
                    "datacenter": "NC",
                    "database": "localdb",
                    "customerId": "55",
                    "userId": "1"
                }
            ],
            "sticky": false
        }
    ];
}
export function getNewNotifications() {
    return [
        {
            id: getId(),
            eventTime: getEventTime(0),
            type: 'SUCCESS',
            sticky: false,
            messages: [
                {
                    id: 2,
                    headline: 'Attribute creation successful',
                    body: 'The attribute MyCoolAttribute of type String was created successfully.'
                }
            ]
        },
        {
            id: getId(),
            eventTime: getEventTime(1),
            type: 'ERROR',
            sticky: false,
            messages: [
                {
                    id: 2,
                    headline: 'Import Job failed',
                    body: 'The import job with Id 567 failed.\nThe uploaded file was not encoded correctly.\n\nThere has been' +
                        ' an error while connecting to the external resource.            Status code:400'
                }
            ]
        },
        {
            id: 9,
            type: 'NEWS',
            eventTime: getEventTime(0),
            sticky: false,
            messages: [
                {
                    id: 9,
                    headline: 'Updated: NOW AVAILABLE: Q1 2017 Quarterly Release Recording',
                    body: `Updated: We are pleased to announce the availability of the recording of the Q2 2017 Quarterly Release
           Training (Tech Session). Please click on the button below to download the recording and presentation.`,
                    optionalActionTitle: 'Details',
                    optionalActionLink: 'http://mapp.com',
                    imageUrl: 'https://picsum.photos/400'
                }
            ]
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1tZXNzYWdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hcHAtdWkvbm90aWZpY2F0aW9uLWNlbnRlci9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9tb2NrLW1lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFHakMsU0FBUyxZQUFZLENBQUMsTUFBYztJQUNsQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDbkUsQ0FBQztBQUVELFNBQVMsS0FBSztJQUNaLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxNQUFNLFVBQVUsdUJBQXVCO0lBQ3JDLE9BQU87UUFDTDtZQUNFLEVBQUUsRUFBRSxDQUFDO1lBQ0wsSUFBSSxFQUFFLFdBQVc7WUFDakIsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDMUIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO1lBQzdELE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFO2dCQUNSO29CQUNFLEVBQUUsRUFBRSxDQUFDO29CQUNMLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLElBQUksRUFBRSx5RUFBeUU7b0JBQy9FLG1CQUFtQixFQUFFLFNBQVM7b0JBQzlCLGtCQUFrQixFQUFFLGlCQUFpQjtpQkFDdEM7YUFDRjtTQUNGO1FBQ0Q7WUFDRSxFQUFFLEVBQUUsRUFBRTtZQUNOLElBQUksRUFBRSxTQUFTO1lBQ2YsU0FBUyxFQUFFLFlBQVksQ0FB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O2FBQ0Y7U0FDRjtRQUNEO1lBQ0UsRUFBRSxFQUFFLENBQUM7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFO2dCQUNSO29CQUNFLEVBQUUsRUFBRSxDQUFDO29CQUNMLFFBQVEsRUFBRSw2REFBNkQ7b0JBQ3ZFLElBQUksRUFBRTtpSEFDaUc7b0JBQ3ZHLG1CQUFtQixFQUFFLFNBQVM7b0JBQzlCLGtCQUFrQixFQUFFLGlCQUFpQjtvQkFDckMsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7YUFDRjtTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL25vdGlmaWNhdGlvbic7XHJcblxyXG5mdW5jdGlvbiBnZXRFdmVudFRpbWUob2Zmc2V0OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIHJldHVybiBEYXRlVGltZS5sb2NhbCgpLm1pbnVzKHsgbWludXRlczogb2Zmc2V0IH0pLnRvSVNPKCkgPz8gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldElkKCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIERhdGUubm93KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbml0aWFsTm90aWZpY2F0aW9ucygpOiBOb3RpZmljYXRpb25bXSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgIHR5cGU6ICdDT1VOVERPV04nLFxyXG4gICAgICBldmVudFRpbWU6IGdldEV2ZW50VGltZSg1KSxcclxuICAgICAgZXhwaXJ5VGltZTogRGF0ZVRpbWUubG9jYWwoKS5wbHVzKHsgaG91cnM6IDQgfSkudG9JU08oKSA/PyAnJyxcclxuICAgICAgc3RpY2t5OiB0cnVlLFxyXG4gICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgaGVhZGxpbmU6ICdTY2hlZHVsZWQgbWFpbnRlbmFuY2UnLFxyXG4gICAgICAgICAgYm9keTogJ1N5c3RlbSB3aWxsIGJlIGRvd24gZm9yIG1haW50ZW5hbmNlLiBQbGVhc2UgcGxhbiB5b3VyIHdvcmsgYWNjb3JkaW5nbHkuJyxcclxuICAgICAgICAgIG9wdGlvbmFsQWN0aW9uVGl0bGU6ICdEZXRhaWxzJyxcclxuICAgICAgICAgIG9wdGlvbmFsQWN0aW9uTGluazogJ2h0dHA6Ly9tYXBwLmNvbSdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAxMSxcclxuICAgICAgdHlwZTogJ1dBUk5JTkcnLFxyXG4gICAgICBldmVudFRpbWU6IGdldEV2ZW50VGltZSgzMCksXHJcbiAgICAgIGV4cGlyeVRpbWU6IERhdGVUaW1lLmxvY2FsKCkucGx1cyh7IGRheXM6IDUgfSkudG9JU08oKSA/PyAnJyxcclxuICAgICAgc3RpY2t5OiB0cnVlLFxyXG4gICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAxMSxcclxuICAgICAgICAgIGhlYWRsaW5lOiAnU2xvdyBJbXBvcnRzJyxcclxuICAgICAgICAgIGJvZHk6ICdJbXBvcnQgc3BlZWRzIGluIEVuZ2FnZSBhcmUgY3VycmVudGx5IHNsb3cuIFRlYW1zIGFyZSB3b3JraW5nIG9uIGl0LicsXHJcbiAgICAgICAgICAvLyBvcHRpb25hbEFjdGlvblRpdGxlOiAnRGV0YWlscycsXHJcbiAgICAgICAgICAvLyBvcHRpb25hbEFjdGlvbkxpbms6ICdodHRwOi8vbWFwcC5jb20nXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogMixcclxuICAgICAgZXZlbnRUaW1lOiBnZXRFdmVudFRpbWUoNCksXHJcbiAgICAgIHR5cGU6ICdFUlJPUicsXHJcbiAgICAgIHN0aWNreTogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2VzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICBoZWFkbGluZTogJ0ltcG9ydCBKb2IgZmFpbGVkJyxcclxuICAgICAgICAgIGJvZHk6ICc8cD48ZW0+VGhlIGltcG9ydCBqb2Igd2l0aCBJZCAxMjMgZmFpbGVkLjxicj5UaGUgdXBsb2FkZWQgZmlsZSB3YXMgbm90IGVuY29kZWQgY29ycmVjdGx5Ljxicj48YnI+VGhlcmUgaGFzIGJlZW4nICtcclxuICAgICAgICAgICcgYW4gZXJyb3Igd2hpbGUgY29ubmVjdGluZyB0byB0aGUgZXh0ZXJuYWwgcmVzb3VyY2UuICAgICAgICAgICAgU3RhdHVzIGNvZGU6MTIzNDwvZW0+PC9wPicsXHJcbiAgICAgICAgICBodG1sQ29udGVudDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDMsXHJcbiAgICAgIGV2ZW50VGltZTogZ2V0RXZlbnRUaW1lKDIpLFxyXG4gICAgICB0eXBlOiAnV0FSTklORycsXHJcbiAgICAgIHN0aWNreTogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2VzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgICBoZWFkbGluZTogJ1RoaXMgaXMgYSB3YXJuaW5nIG1lc3NhZ2UnLFxyXG4gICAgICAgICAgYm9keTogJ1BsZWFzZSBiZSBhd2FyZSB0aGF0IHN0cmFuZ2UgdGhpbmdzIG1pZ2h0IGhhcHBlbiBpZiB5b3UgZG8gbm90IHJlYWQgdGhpcyB3YXJuaW5nISdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA0LFxyXG4gICAgICB0eXBlOiAnSU5GTycsXHJcbiAgICAgIGV2ZW50VGltZTogZ2V0RXZlbnRUaW1lKDEwKSxcclxuICAgICAgc3RpY2t5OiBmYWxzZSxcclxuICAgICAgbWVzc2FnZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogNCxcclxuICAgICAgICAgIGhlYWRsaW5lOiAnUmVsZWFzZSBJbmZvcm1hdGlvbicsXHJcbiAgICAgICAgICBib2R5OiAnWW91ciBDRVAgc3lzdGVtIGhhcyBiZWVuIHVwZGF0ZWQgdG8gdmVyc2lvbiA2LjkwLjE5NDAuXFxuRW5qb3kgYWxsIHRoZSBncmVhdCBuZXcgZmVhdHVyZXMgYW5kIGJ1Z3MhJyxcclxuICAgICAgICAgIG9wdGlvbmFsQWN0aW9uVGl0bGU6ICdEZXRhaWxzJyxcclxuICAgICAgICAgIG9wdGlvbmFsQWN0aW9uTGluazogJ2h0dHA6Ly9tYXBwLmNvbSdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA1LFxyXG4gICAgICB0eXBlOiAnTkVXUycsXHJcbiAgICAgIGV2ZW50VGltZTogZ2V0RXZlbnRUaW1lKDEwKSxcclxuICAgICAgc3RpY2t5OiBmYWxzZSxcclxuICAgICAgbWVzc2FnZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogNSxcclxuICAgICAgICAgIGhlYWRsaW5lOiAnTk9XIEFWQUlMQUJMRTogUTIgMjAxNyBRdWFydGVybHkgUmVsZWFzZSBSZWNvcmRpbmcnLFxyXG4gICAgICAgICAgYm9keTogYFdlIGFyZSBwbGVhc2VkIHRvIGFubm91bmNlIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIHJlY29yZGluZyBvZiB0aGUgUTIgMjAxNyBRdWFydGVybHkgUmVsZWFzZSBUcmFpbmluZ1xyXG4gICAgICAgICAgKFRlY2ggU2Vzc2lvbikuIFBsZWFzZSBjbGljayBvbiB0aGUgYnV0dG9uIGJlbG93IHRvIGRvd25sb2FkIHRoZSByZWNvcmRpbmcgYW5kIHByZXNlbnRhdGlvbi5gLFxyXG4gICAgICAgICAgb3B0aW9uYWxBY3Rpb25UaXRsZTogJ0RldGFpbHMnLFxyXG4gICAgICAgICAgb3B0aW9uYWxBY3Rpb25MaW5rOiAnaHR0cDovL21hcHAuY29tJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzQwMCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA2LFxyXG4gICAgICB0eXBlOiAnTkVXUycsXHJcbiAgICAgIGV2ZW50VGltZTogZ2V0RXZlbnRUaW1lKDEyKSxcclxuICAgICAgc3RpY2t5OiBmYWxzZSxcclxuICAgICAgbWVzc2FnZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogNixcclxuICAgICAgICAgIGhlYWRsaW5lOiAnTk9XIEFWQUlMQUJMRTogUTEgMjAxNyBRdWFydGVybHkgUmVsZWFzZSBSZWNvcmRpbmcnLFxyXG4gICAgICAgICAgYm9keTogYFdlIGFyZSBwbGVhc2VkIHRvIGFubm91bmNlIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIHJlY29yZGluZyBvZiB0aGUgUTIgMjAxNyBRdWFydGVybHkgUmVsZWFzZSBUcmFpbmluZ1xyXG4gICAgICAgICAgKFRlY2ggU2Vzc2lvbikuIFBsZWFzZSBjbGljayBvbiB0aGUgYnV0dG9uIGJlbG93IHRvIGRvd25sb2FkIHRoZSByZWNvcmRpbmcgYW5kIHByZXNlbnRhdGlvbi5gLFxyXG4gICAgICAgICAgb3B0aW9uYWxBY3Rpb25UaXRsZTogJ0RldGFpbHMnLFxyXG4gICAgICAgICAgb3B0aW9uYWxBY3Rpb25MaW5rOiAnaHR0cDovL21hcHAuY29tJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzQwMCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA3LFxyXG4gICAgICBldmVudFRpbWU6IGdldEV2ZW50VGltZSgxNCksXHJcbiAgICAgIHR5cGU6ICdFUlJPUicsXHJcbiAgICAgIHN0aWNreTogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2VzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6IDcsXHJcbiAgICAgICAgICBoZWFkbGluZTogJ1lvdXIgbmV3IHBhc3N3b3JkIGRvZXMgbm90IHBhc3MgdGhlIGZvbGxvd2luZy4uLicsXHJcbiAgICAgICAgICBodG1sQ29udGVudDogdHJ1ZSxcclxuICAgICAgICAgIGJvZHk6IGA8ZGl2IGRhdGEtbm90aWZpY2F0aW9uLW9wdGlvbnM9XCJ7JnF1b3Q7c3RyaXBIdG1sJnF1b3Q7OmZhbHNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICA8cD48ZW0+WW91ciBuZXcgcGFzc3dvcmQgZG9lcyBub3QgcGFzcyB0aGUgZm9sbG93aW5nIHNlY3VyaXR5IHJ1bGVzOjwvZW0+PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8cD48ZW0+LSBNaW5pbXVtIGxlbmd0aCBpcyA4IGNoYXJhY3RlcnM8YnI+XHJcbiAgICAgICAgICAgICAgICAgIC0gQ29udGFpbiBhdCBsZWFzdCBvbmUgdXBwZXIgY2FzZSBsZXR0ZXI8YnI+XHJcbiAgICAgICAgICAgICAgICAgIC0gQ29udGFpbiBhdCBsZWFzdCBvbmUgbnVtYmVyPGJyPlxyXG4gICAgICAgICAgICAgICAgICAtIENvbnRhaW4gYXQgbGVhc3Qgb25lIHN5bWJvbDxicj5cclxuICAgICAgICAgICAgICAgICAgPC9lbT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcImlkXCI6IDgsXHJcbiAgICAgIFwidHlwZVwiOiBcIklORk9cIixcclxuICAgICAgXCJldmVudFRpbWVcIjogZ2V0RXZlbnRUaW1lKDIwKSxcclxuICAgICAgXCJzb3VyY2VcIjogXCJJbXBvcnRNZW1iZXJzSm9iXCIsXHJcbiAgICAgIFwibWVzc2FnZXNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaWRcIjogOCxcclxuICAgICAgICAgIFwiaGVhZGxpbmVcIjogXCJJbXBvcnQgUmVwb3J0IC0gdGVzdF91ZWVwNTYyXzA1MDcyMlwiLFxyXG4gICAgICAgICAgXCJib2R5XCI6IFwiSGVsbG8gLFxcblxcblxcbnlvdXIgaW1wb3J0IGhhZCB0aGUgZm9sbG93aW5nIHJlc3VsdHM6XFxuXFxuTmV3c2xldHRlcjogICAgICAgICAgICB0ZXN0X3VlZXA1NjJfMDUwNzIyICh0ZXN0X3VlZXA1NjJfMDUwNzIyQGRvY2tlcjAxLmRtY2xhYi5tdWMuZG9tZXVzLmNvbSlcXG5vbjogICAgICAgICAgICAgICAgICAgIDA1LjA3LjIwMjIgMDk6MjVcXG5kdXJhdGlvbjogICAgICAgICAgICAgIDMgc2Vjb25kc1xcblxcblN5bmNocm9uaXNhdGlvbiBtb2RlOiAgQWRkLVVwZGF0ZVxcbndpdGggcXVhbGlmaWVyczogW0tlZXAgVW5zdWJzY3JpcHRpb25zLCBPdmVyd3JpdGUgb25seSBBdHRyaWJ1dGVzIGZyb20gRmlsZV1cXG5cXG5OZXcgcmVjaXBpZW50cyB3ZXJlOiAgIGFkZGVkIHdpdGhvdXQgbWVzc2FnZVxcblxcbkltcG9ydCBmaWxlIG5hbWU6ICAgICAgdGVzdExhYjU1X3Rlc3RBbmRyb2lkVXNlcnMwNTA3MjIuY3N2XFxuSW1wb3J0IGZpbGUgdHlwZTogICAgICBjc3ZcXG5cXG5SZXN1bHQgb3ZlcnZpZXc6XFxuXFxuRmF0YWwgRXJyb3JzOiAgICAgICAgICAtXFxuUHJvY2Vzc2VkOiAgICAgICAgICAgICAyIHJlY2lwaWVudHMgKEFVVE9fMzAwMTI5Xzk4NjgzOTRBOUIyMjVCMjU4NTMyRkRBM0IzRkY2MEZDMTZFQ0ZFNUFEMTc0MjIzQjM2MUJGOEU1MzE0Rjk3ODEgKDEwMCUpKVxcblxcbjAgcmVjaXBpZW50cyBhZGRlZFxcbjIgcmVjaXBpZW50cyB1cGRhdGVkL3JlcGxhY2VkXFxuMCByZWNpcGllbnRzIHJlbW92ZWRcXG4wIGVycm9yc1xcblxcblxcblxcblxcblxcblxcbkJlc3QgcmVnYXJkcywgXFxuXFxuWW91ciB0ZWFtQGRvY2tlcjAxLmRtY2xhYi5tdWMuZG9tZXVzLmNvbVwiLFxyXG4gICAgICAgICAgXCJsb2NhbGVcIjogXCJlblwiLFxyXG4gICAgICAgICAgXCJvcHRpb25hbEFjdGlvblRpdGxlXCI6IFwiRG93bmxvYWQgcmVwb3J0XCIsXHJcbiAgICAgICAgICBcIm9wdGlvbmFsQWN0aW9uTGlua1wiOiBcImh0dHA6Ly8xMC4xMjguMjUxLjU1L2hvbWUvbG9naW4uanNwP3JlZGlyZWN0VVJMPXVzZXIvaW1wb3J0UmVwb3J0LmpzcCZyZXBpZD0zODJcIlxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgXCJhdWRpZW5jZXNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaWRcIjogMSxcclxuICAgICAgICAgIFwiZGF0YWNlbnRlclwiOiBcIk5DXCIsXHJcbiAgICAgICAgICBcImRhdGFiYXNlXCI6IFwibG9jYWxkYlwiLFxyXG4gICAgICAgICAgXCJjdXN0b21lcklkXCI6IFwiNTVcIixcclxuICAgICAgICAgIFwidXNlcklkXCI6IFwiMVwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBcInN0aWNreVwiOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5ld05vdGlmaWNhdGlvbnMoKTogTm90aWZpY2F0aW9uW10ge1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiBnZXRJZCgpLFxyXG4gICAgICBldmVudFRpbWU6IGdldEV2ZW50VGltZSgwKSxcclxuICAgICAgdHlwZTogJ1NVQ0NFU1MnLFxyXG4gICAgICBzdGlja3k6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgaGVhZGxpbmU6ICdBdHRyaWJ1dGUgY3JlYXRpb24gc3VjY2Vzc2Z1bCcsXHJcbiAgICAgICAgICBib2R5OiAnVGhlIGF0dHJpYnV0ZSBNeUNvb2xBdHRyaWJ1dGUgb2YgdHlwZSBTdHJpbmcgd2FzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LidcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiBnZXRJZCgpLFxyXG4gICAgICBldmVudFRpbWU6IGdldEV2ZW50VGltZSgxKSxcclxuICAgICAgdHlwZTogJ0VSUk9SJyxcclxuICAgICAgc3RpY2t5OiBmYWxzZSxcclxuICAgICAgbWVzc2FnZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogMixcclxuICAgICAgICAgIGhlYWRsaW5lOiAnSW1wb3J0IEpvYiBmYWlsZWQnLFxyXG4gICAgICAgICAgYm9keTogJ1RoZSBpbXBvcnQgam9iIHdpdGggSWQgNTY3IGZhaWxlZC5cXG5UaGUgdXBsb2FkZWQgZmlsZSB3YXMgbm90IGVuY29kZWQgY29ycmVjdGx5LlxcblxcblRoZXJlIGhhcyBiZWVuJyArXHJcbiAgICAgICAgICAnIGFuIGVycm9yIHdoaWxlIGNvbm5lY3RpbmcgdG8gdGhlIGV4dGVybmFsIHJlc291cmNlLiAgICAgICAgICAgIFN0YXR1cyBjb2RlOjQwMCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA5LFxyXG4gICAgICB0eXBlOiAnTkVXUycsXHJcbiAgICAgIGV2ZW50VGltZTogZ2V0RXZlbnRUaW1lKDApLFxyXG4gICAgICBzdGlja3k6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiA5LFxyXG4gICAgICAgICAgaGVhZGxpbmU6ICdVcGRhdGVkOiBOT1cgQVZBSUxBQkxFOiBRMSAyMDE3IFF1YXJ0ZXJseSBSZWxlYXNlIFJlY29yZGluZycsXHJcbiAgICAgICAgICBib2R5OiBgVXBkYXRlZDogV2UgYXJlIHBsZWFzZWQgdG8gYW5ub3VuY2UgdGhlIGF2YWlsYWJpbGl0eSBvZiB0aGUgcmVjb3JkaW5nIG9mIHRoZSBRMiAyMDE3IFF1YXJ0ZXJseSBSZWxlYXNlXHJcbiAgICAgICAgICAgVHJhaW5pbmcgKFRlY2ggU2Vzc2lvbikuIFBsZWFzZSBjbGljayBvbiB0aGUgYnV0dG9uIGJlbG93IHRvIGRvd25sb2FkIHRoZSByZWNvcmRpbmcgYW5kIHByZXNlbnRhdGlvbi5gLFxyXG4gICAgICAgICAgb3B0aW9uYWxBY3Rpb25UaXRsZTogJ0RldGFpbHMnLFxyXG4gICAgICAgICAgb3B0aW9uYWxBY3Rpb25MaW5rOiAnaHR0cDovL21hcHAuY29tJyxcclxuICAgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzQwMCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdO1xyXG59XHJcbiJdfQ==