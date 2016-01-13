function SessionAllDefault() {
    Session.setDefaultPersistent('sudahVoting', false);
	Session.setDefaultPersistent('sudahLogin', false);
	Session.setDefaultPersistent('erorLogin', 'validate');
	Session.setDefaultPersistent('angkatan', 1);
	Session.setDefaultPersistent('user', '');
}
SessionAllDefault();