import type { UmbracoManifest } from '../types/umbracoManifest'

export const reactModelManifest: UmbracoManifest = {
  "generatedAt": "2026-08-01T23:11:47.975Z",
  "contentTypes": [
    {
      "alias": "aboutPage",
      "name": "About Page",
      "isElement": false,
      "properties": [
        {
          "alias": "about",
          "name": "About",
          "propertyEditorAlias": "Umbraco.RichText",
          "valueStorageType": "Ntext",
          "dataTypeId": -87,
          "dataTypeName": "Richtext editor",
          "dataTypeEditorAlias": "Umbraco.RichText",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Tiptap",
          "dataTypeConfiguration": {
            "blocks": [],
            "allowedMediaTypes": "cc07b313-0843-4aa8-bbda-871c8da728c8,c4b1efcf-a9d5-41c4-9621-e9d273b52a9c",
            "mediaParentId": null,
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "title",
          "name": "Title",
          "propertyEditorAlias": "Umbraco.TextBox",
          "valueStorageType": "Nvarchar",
          "dataTypeId": -88,
          "dataTypeName": "Textstring",
          "dataTypeEditorAlias": "Umbraco.TextBox",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.TextBox",
          "dataTypeConfiguration": {
            "maxChars": null
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    },
    {
      "alias": "homePage",
      "name": "Home Page",
      "isElement": false,
      "properties": [
        {
          "alias": "subheader",
          "name": "Sub Header",
          "propertyEditorAlias": "Umbraco.TextBox",
          "valueStorageType": "Nvarchar",
          "dataTypeId": -88,
          "dataTypeName": "Textstring",
          "dataTypeEditorAlias": "Umbraco.TextBox",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.TextBox",
          "dataTypeConfiguration": {
            "maxChars": null
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 2
        },
        {
          "alias": "summary",
          "name": "Summary",
          "propertyEditorAlias": "Umbraco.RichText",
          "valueStorageType": "Ntext",
          "dataTypeId": -87,
          "dataTypeName": "Richtext editor",
          "dataTypeEditorAlias": "Umbraco.RichText",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Tiptap",
          "dataTypeConfiguration": {
            "blocks": [],
            "allowedMediaTypes": "cc07b313-0843-4aa8-bbda-871c8da728c8,c4b1efcf-a9d5-41c4-9621-e9d273b52a9c",
            "mediaParentId": null,
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 3
        },
        {
          "alias": "title",
          "name": "Title",
          "propertyEditorAlias": "Umbraco.TextBox",
          "valueStorageType": "Nvarchar",
          "dataTypeId": -88,
          "dataTypeName": "Textstring",
          "dataTypeEditorAlias": "Umbraco.TextBox",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.TextBox",
          "dataTypeConfiguration": {
            "maxChars": null
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    },
    {
      "alias": "main",
      "name": "Main",
      "isElement": false,
      "properties": [
        {
          "alias": "copyrightLabel",
          "name": "Copyright Label",
          "propertyEditorAlias": "Umbraco.TextBox",
          "valueStorageType": "Nvarchar",
          "dataTypeId": -88,
          "dataTypeName": "Textstring",
          "dataTypeEditorAlias": "Umbraco.TextBox",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.TextBox",
          "dataTypeConfiguration": {
            "maxChars": null
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "topNav",
          "name": "Top Navigation",
          "propertyEditorAlias": "Umbraco.SingleBlock",
          "valueStorageType": "Ntext",
          "dataTypeId": 1070,
          "dataTypeName": "Top Navigation Component",
          "dataTypeEditorAlias": "Umbraco.SingleBlock",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.BlockSingle",
          "dataTypeConfiguration": {
            "blocks": [
              {
                "contentElementTypeKey": "48227659-3083-4a2a-b799-78efe61d17a8",
                "settingsElementTypeKey": null
              }
            ]
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "useFooter",
          "name": "Use Footer",
          "propertyEditorAlias": "Umbraco.TrueFalse",
          "valueStorageType": "Integer",
          "dataTypeId": -49,
          "dataTypeName": "True/false",
          "dataTypeEditorAlias": "Umbraco.TrueFalse",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Toggle",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    },
    {
      "alias": "monogramIcon",
      "name": "Monogram Icon",
      "isElement": false,
      "properties": [
        {
          "alias": "backgroundColor",
          "name": "Background Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "borderColor",
          "name": "Border Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 4
        },
        {
          "alias": "borderRadius",
          "name": "Corner Radius",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 2
        },
        {
          "alias": "borderWidth",
          "name": "Border Width",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 3
        },
        {
          "alias": "defLetterBorderColor",
          "name": "Letter Border Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 3
        },
        {
          "alias": "defLetterBorderWidth",
          "name": "Letter Border Width",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 2
        },
        {
          "alias": "defLetterColor",
          "name": "Letter Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "flipTheme",
          "name": "Flip Theme",
          "propertyEditorAlias": "Umbraco.TrueFalse",
          "valueStorageType": "Integer",
          "dataTypeId": -49,
          "dataTypeName": "True/false",
          "dataTypeEditorAlias": "Umbraco.TrueFalse",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Toggle",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "letterGap",
          "name": "Spacing Between Letter",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "letters",
          "name": "Letters",
          "propertyEditorAlias": "Umbraco.BlockList",
          "valueStorageType": "Ntext",
          "dataTypeId": 1094,
          "dataTypeName": "Monogram SVG List",
          "dataTypeEditorAlias": "Umbraco.BlockList",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.BlockList",
          "dataTypeConfiguration": {
            "blocks": [
              {
                "contentElementTypeKey": "0296c694-318c-47a7-8dac-7784500be6ec",
                "settingsElementTypeKey": null
              }
            ],
            "validationLimit": {
              "min": null,
              "max": null
            },
            "useSingleBlockMode": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "padding",
          "name": "Padding",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 5
        }
      ]
    },
    {
      "alias": "monogramSvg",
      "name": "Monogram SVG",
      "isElement": true,
      "properties": [
        {
          "alias": "borderColor",
          "name": "Border Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 2
        },
        {
          "alias": "borderWidth",
          "name": "Border Width",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "color",
          "name": "Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "letter",
          "name": "Letter",
          "propertyEditorAlias": "Umbraco.TextBox",
          "valueStorageType": "Nvarchar",
          "dataTypeId": -88,
          "dataTypeName": "Textstring",
          "dataTypeEditorAlias": "Umbraco.TextBox",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.TextBox",
          "dataTypeConfiguration": {
            "maxChars": null
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "padding",
          "name": "Padding",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 3
        },
        {
          "alias": "xAxis",
          "name": "X axis",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "yAxis",
          "name": "Y axis",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "zIndex",
          "name": "Icon Stack Order",
          "propertyEditorAlias": "Umbraco.Integer",
          "valueStorageType": "Integer",
          "dataTypeId": -51,
          "dataTypeName": "Numeric",
          "dataTypeEditorAlias": "Umbraco.Integer",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Integer",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 2
        }
      ]
    },
    {
      "alias": "navItem",
      "name": "Navigation Item",
      "isElement": true,
      "properties": [
        {
          "alias": "navigationLink",
          "name": "Navigation Link",
          "propertyEditorAlias": "Umbraco.MultiUrlPicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1065,
          "dataTypeName": "Navigation Item - Navigation Link - Multi URL Picker",
          "dataTypeEditorAlias": "Umbraco.MultiUrlPicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.MultiUrlPicker",
          "dataTypeConfiguration": {
            "minNumber": 0,
            "maxNumber": 1,
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    },
    {
      "alias": "routesFolder",
      "name": "Routes",
      "isElement": false,
      "properties": []
    },
    {
      "alias": "siteSettings",
      "name": "Site Settings",
      "isElement": false,
      "properties": [
        {
          "alias": "mainBgColor",
          "name": "Main Background Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "mainTextColor",
          "name": "Main Text Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "primaryColor",
          "name": "Primary Color",
          "propertyEditorAlias": "Umbraco.MultiNodeTreePicker",
          "valueStorageType": "Ntext",
          "dataTypeId": 1082,
          "dataTypeName": "Theme Color Picker",
          "dataTypeEditorAlias": "Umbraco.MultiNodeTreePicker",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.ContentPicker",
          "dataTypeConfiguration": {
            "startNode": {
              "type": "content",
              "query": null,
              "dynamicRoot": {
                "originAlias": "Root",
                "originKey": null,
                "querySteps": [
                  {
                    "alias": "NearestDescendantOrSelf",
                    "anyOfDocTypeKeys": [
                      "8b0bef97-2d17-4af2-87a1-459af4594486"
                    ]
                  }
                ]
              },
              "id": null
            },
            "minNumber": 0,
            "maxNumber": 1,
            "filter": "f3a64e23-baa5-43f7-b344-f24efb79f6a0",
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 2
        },
        {
          "alias": "siteLogo",
          "name": "Site Logo",
          "propertyEditorAlias": "Umbraco.MediaPicker3",
          "valueStorageType": "Ntext",
          "dataTypeId": 1053,
          "dataTypeName": "Image Media Picker",
          "dataTypeEditorAlias": "Umbraco.MediaPicker3",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.MediaPicker",
          "dataTypeConfiguration": {
            "filter": "cc07b313-0843-4aa8-bbda-871c8da728c8",
            "multiple": false,
            "validationLimit": {
              "min": 0,
              "max": 1
            },
            "startNodeId": null,
            "enableLocalFocalPoint": false,
            "crops": null,
            "ignoreUserStartNodes": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    },
    {
      "alias": "themeColor",
      "name": "Theme Color",
      "isElement": false,
      "properties": [
        {
          "alias": "dark",
          "name": "Dark",
          "propertyEditorAlias": "Umbraco.ColorPicker.EyeDropper",
          "valueStorageType": "Nvarchar",
          "dataTypeId": 1090,
          "dataTypeName": "Theme Color Pallet Picker",
          "dataTypeEditorAlias": "Umbraco.ColorPicker.EyeDropper",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.EyeDropper",
          "dataTypeConfiguration": {
            "showPalette": true
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "light",
          "name": "Light",
          "propertyEditorAlias": "Umbraco.ColorPicker.EyeDropper",
          "valueStorageType": "Nvarchar",
          "dataTypeId": 1090,
          "dataTypeName": "Theme Color Pallet Picker",
          "dataTypeEditorAlias": "Umbraco.ColorPicker.EyeDropper",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.EyeDropper",
          "dataTypeConfiguration": {
            "showPalette": true
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    },
    {
      "alias": "themeColors",
      "name": "Theme Colors",
      "isElement": false,
      "properties": []
    },
    {
      "alias": "topNavigation",
      "name": "Top Navigation",
      "isElement": true,
      "properties": [
        {
          "alias": "hideTopNavigation",
          "name": "Hide Top Navigation",
          "propertyEditorAlias": "Umbraco.TrueFalse",
          "valueStorageType": "Integer",
          "dataTypeId": -49,
          "dataTypeName": "True/false",
          "dataTypeEditorAlias": "Umbraco.TrueFalse",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Toggle",
          "dataTypeConfiguration": {},
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        },
        {
          "alias": "navItemAlignment",
          "name": "Nav Item Alignment",
          "propertyEditorAlias": "Umbraco.DropDown.Flexible",
          "valueStorageType": "Nvarchar",
          "dataTypeId": 1072,
          "dataTypeName": "Component Alignment",
          "dataTypeEditorAlias": "Umbraco.DropDown.Flexible",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.Dropdown",
          "dataTypeConfiguration": {
            "multiple": false,
            "items": [
              "Left",
              "Center",
              "Right",
              "Full"
            ]
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 1
        },
        {
          "alias": "navItems",
          "name": "Nav Items",
          "propertyEditorAlias": "Umbraco.BlockList",
          "valueStorageType": "Ntext",
          "dataTypeId": 1068,
          "dataTypeName": "Navigation Item List",
          "dataTypeEditorAlias": "Umbraco.BlockList",
          "dataTypeEditorUiAlias": "Umb.PropertyEditorUi.BlockList",
          "dataTypeConfiguration": {
            "blocks": [
              {
                "contentElementTypeKey": "cfe41dd9-3fc1-4a3e-8ea2-f6a1acc19aa0",
                "settingsElementTypeKey": null
              }
            ],
            "validationLimit": {
              "min": null,
              "max": null
            },
            "useSingleBlockMode": false
          },
          "mandatory": false,
          "variesByCulture": false,
          "variesBySegment": false,
          "sortOrder": 0
        }
      ]
    }
  ]
}
