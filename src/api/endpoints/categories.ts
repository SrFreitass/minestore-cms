import { AxiosInstance } from "axios"
import { TCategories } from "@/types/categories"

type ReturnType = TCategories

export const getCategories = (fetcher: AxiosInstance) =>
   async () => {
      const url = "/categories/get"
      console.log((await fetcher.post<ReturnType>(url)).data[1].subcategories);

      const subCategory = [
         {
            idx: 1,
            name: 'VIPs',
            active: 1,
            description: '<p>Unlock elite perks and enhanced features to dominate the battlefield and protect your faction with our exclusive Factions keys!</p>',
            url: 'factions/keys',
            img: null,
            subcategories: []
         }, 
         {
            idx: 2,
            name: 'Cash',
            active: 1,
            description: '<p>Unlock elite perks and enhanced features to dominate the battlefield and protect your faction with our exclusive Factions keys!</p>',
            url: 'factions/keys',
            img: null,
            subcategories: []
         }
      ]

      // Mock
      return [
         {
            idx: 1,
            name: 'Rankup Mystic',
            active: 1,
            description: '<p>Factions</p>',
            url: 'factions',
            img: 'https://s3-alpha-sig.figma.com/img/baa0/9688/d62218c218ccd1543a6566868e923a59?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g41pvOfkpeFgjQYCuEt8xSJymGd750LzFV-ynj3eG1MqoiR25KQgJwj4EvHQTsJVobZwigey3xmyQkNkvf2EtjC7FgAYPRrZbhgLHjXn4rlK2XFNKzurZuHTtmkHuEX8we75YUSP9vtGbCjX23AR-w3pVdN8fDtpuP4nzAjd2OJHWr53lS-oqPkLl4mAGNtEiP8ZbaceacNgalJDxkACtsVsCQOpOY9Sjz3v5hZm9vAvkCiBcPUHv9jS72ZDBXZzstid99f3apA4DOBSal9pI4C3vDJ7I5sT2mYuVFPKd3woV0bJto9iwC1vQe20nlOfsYKbMBRx9Ui5pcZ18DmXRg__',
            subcategories: [...subCategory]
          },
          {
            idx: 2,
            name: 'Survival 2.0',
            active: 1,
            description: '<p>Factions</p>',
            url: 'factions',
            img: 'https://s3-alpha-sig.figma.com/img/5cf7/cd27/01008910a11def8b049a0f2704ec5f4f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8iEK~HCQ2RzzxeyeKmcj7oXGhKB7C7D-aw7pi4wVzGxYhEmp9jOvIlge5QdNeciM-q7VNQnOe6z~~uVvuaQMf-NHa4OHU44OsangB-thbuATzebdYojWuDt-xkkgEqc7ooQacwcb9gwqPEAGrPqEpeXE9BZ~RyQDj6VARlN41XK66tWEN95p~wSEwDlLPSjFyO4Rfcit5vsctah3Fv5ltnFdZlwNWLOV6UxKxVSeCVCsz7zpBL2r6q5Uicg-Tqt39iUy-YQdOxAXTnj934SNbrkzKIGSVMzanlDTJ9NlmCTPiJAjjy10Mxj68~43fkl7WkJJ5VDBWhkSNkv3hn2CA__',
            subcategories: [...subCategory]
          },
          {
            idx: 3,
            name: 'SkyBlock',
            active: 1,
            description: '<p>Factions</p>',
            url: 'factions',
            img: 'https://s3-alpha-sig.figma.com/img/cdfd/bb0d/63ce23ae017f2e35669900fdaa972236?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lk-PDmwnkqjjcgTIdQbc9ErNLpK~NMbG2oP3-PTNfOfTHVH7DQgpCnNWzs1HbCDviu-Qo1bgcWFukP7kYCvF1gKWK4tjYbles0Isv-7isYxPrnryggMz7okhGZoY7yZYyoVbZHC4qED5TUJYDDcsBgZ5u3Dus43b-UzV-SIuoONsuKpJKSSCo-O30pAj2EwAKHDBfyl-sMaTeisz44Le~arxTHCfmUG-W5AGPd22aXWqh74Q8qUhtsdwZs90xp4zQS0UfZqR8wblandQG2tUqej6wDsBmINUrpJpjbrIQ0r-U7tn3baPw7wKrEOEWn7Xz4znvwYsUDiAd5OH16SlgA__',
            subcategories: [...subCategory]
          },
          {
            idx: 4,
            name: 'P4Free',
            active: 1,
            description: '<p>Factions</p>',
            url: 'factions',
            img: 'https://s3-alpha-sig.figma.com/img/b4aa/484f/829d262a445b75eaa6c69c86845ee6d6?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KgwAyna-9~T1J96IDlj-JQkW6rXcg172g~ACAHNivTDYjjUcHfwlXFOv6EA3FdzPnAfb26K8DeiG~ER7yrezdquhNSQw9~dQ6Yr-oc8Z4xDAfwyXBfX78XBMzKDJM3PYPMkLsO15oIMdFiO1A58Vr~FFt2hO9agOkkyjg5PUgScwmuQeI4fuVgW7D2Qf7VUxJokkbdmvwPCzyrwULrGeeLjDHgZcQ6YqQZ6KUwSq5sT--vWWfy3aR-x9EJSpk6al-wKZh0~tfHa9D49aQ2yPrJV0CydRDGZF69lrqFXLLFkEgCpBcFG6aGNczDD-DVfGQFQXfeZx2E~AE0k5nPvR5Q__',
            subcategories: [...subCategory]
          },
      ]
   }
