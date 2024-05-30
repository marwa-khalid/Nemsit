export interface AuthModel {
  result: {
    token: string;
    bag?: string;
    expirationDateUtc: Date;
    tokenIsValid: boolean;
    activeSessionTokenIsAllreadyValid: boolean;
    expirationDateUtcAsString: string;
    redirectToModule: number;
    redirectToModuleInstanceId: string | null;
    canRedirectToModule: boolean;
  };
  messages: {
    message: string;
    type: number;
  }[];
  hasErrors: boolean;
  isValid: boolean;
  textInfo: any;
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}


export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel { 
  result: {
    subscriberId: number;
    person: {
      id: number;
      fullName: string;
      dateOfRegistration: string;
      dateOfRegistrationAsIso8601String: string;
      currentTotalDaysSinceRegistration: number;
      userType: {
        value: number;
        name: string;
        description: string;
      };
      genderType: {
        value: number;
        name: string;
        description: string;
      };
      isAnonymousClient: boolean;
      anonymousClientId: number;
      firstName: string;
      betweenName: string;
      lastName: string;
      phoneNr: string;
      mobileNr: string;
      emailAddress: string;
      fullLastName: string;
    };
    takeOverOwnerPerson?: {
      id: number;
      fullName: string;
      dateOfRegistration: string;
      dateOfRegistrationAsIso8601String: string;
      currentTotalDaysSinceRegistration: number;
      userType: {
        value: number;
        name: string;
        description: string;
      };
      genderType: {
        value: number;
        name: string;
        description: string;
      };
      isAnonymousClient: boolean;
      anonymousClientId: number;
      firstName: string;
      betweenName: string;
      lastName: string;
      phoneNr: string;
      mobileNr: string;
      emailAddress: string;
      fullLastName: string;
      subscriberId: number;
      companyId: number;
      isAccountant: boolean;
    };
    hasTakeOverOwnerPerson: boolean;
    activeLicense: {
      trialIsExpiring: boolean;
      daysLeftToExpiration: number;
      licenseIsExpiring: boolean;
      isActive: boolean;
      id: number;
      isTrialMode: boolean;
      licenseIsManagedByAccountant: boolean;
      hasAutoRenew: boolean;
      hasFutureLicense: boolean;
      futureLicense: string;
      validFrom: string;
      validFromAsString: string;
      validTill: string;
      validTillAsString: string;
      title: string;
      statusType: {
        value: number;
        name: string;
        description: string;
      };
      licenseType: {
        value: number;
        name: string;
        description: string;
      };
      canUseBankConnectModule: boolean;
      canUseOcrScan: boolean;
      canUseOcrMobileApp: boolean;
    };
    activeCompany: {
      isDefault: boolean;
      companyType: number;
      id: number;
      title: string;
      inboxEmailAddress: string;
      companyLogoUrl: string;
      hasCompanyLogoUrl: boolean;
      addressAsHtml: string;
      accountCompany: string;
      accountHolderName: string;
      accountNrIBAN: string;
      vatNr: string;
      registrationNr: string;
      factoringClientSessionStatement: string;
    };
    accountant: {
      id: number;
      title: string;
      companyLogoUrl: string;
      hasCompanyLogoUrl: boolean;
      addressAsHtml: string;
      accountCompany: string;
      accountHolderName: string;
      accountNrIBAN: string;
      vatNr: string;
      registrationNr: string;
      beconNr: string;
      notificationEmailAddress: string;
      inboxEmailAddress: string;
    };
    hasAccountant: boolean;
    companies: {
      isDefault: boolean;
      companyType: number;
      id: number;
      title: string;
      inboxEmailAddress: string;
      companyLogoUrl: string;
      hasCompanyLogoUrl: boolean;
      addressAsHtml: string;
      accountCompany: string;
      accountHolderName: string;
      accountNrIBAN: string;
      vatNr: string;
      registrationNr: string;
      factoringClientSessionStatement: string;
    }[];
    userType: {
      value: number;
      name: string;
      description: string;
    };
    isInTakeOverMode: boolean;
    id: number;
    displayName: string;
    emailAddress: string;
    languageType: {
      value: number;
      name: string;
      description: string;
    };
    isAnonymousUser: boolean;
    isRootAdmin: boolean;
    isAdministrator: boolean;
    isAccountant: boolean;
    isAccountaProUser: boolean;
    accessibleModules: {
      value: number;
      name: string;
      description: string;
    }[];
    switches: {
      isInTakeOverMode: boolean;
      isFirstTimeUser: boolean;
      hasFinishedSubscriptionInitialSetup: boolean;
      canUseSepaAutomations: boolean;
      canUseOcrModule: boolean;
      requiresDefaultCompanyDetails: boolean;
      requiresCompanyLogo: boolean;
      hasAccountantEmailInboxConfigured: boolean;
    };
    activeCompanyDefaults: {
      defaultValuta: {
        valutaType: {
          value: number;
          name: string;
          description: string;
        };
        sign: string;
      };
      defaultVatIdForSalesAndProducts: number;
      defaultVatIdForReceipts: number;
      defaultLedgerAccountIdForReceipts: number;
      defaultLedgerAccountIdForSalesAndProducts: number;
      defaultDeadlineForPaymentDays: number;
      minYear: number;
      maxYear: number;
      taxReportingPeriodType: number;
    };
  };
  messages: {
    type: number;
    typeDescription: string;
    message: string;
    title: string;
  }[];
  hasErrors: boolean;
  isValid: boolean;
  textInfo: string;
}

export enum TraceInfoType {
  Debug = 0,
  Success = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
  Critical = 5,
  Fatal = 6,
  UpgradeError = 99,
  Upgrade = 98
}
