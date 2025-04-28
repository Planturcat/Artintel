"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, Children, isValidElement, cloneElement } from 'react';

// Supported languages
export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
  autoTranslationEnabled: boolean;
  setAutoTranslationEnabled: (enabled: boolean) => void;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: {},
  t: (key) => key,
  autoTranslationEnabled: false,
  setAutoTranslationEnabled: () => {}
});

// English translations (default)
const enTranslations: Record<string, string> = {
  // Common UI elements
  'dashboard': 'Dashboard',
  'settings': 'Settings',
  'profile': 'Profile',
  'appearance': 'Appearance',
  'security': 'Security',
  'notifications': 'Notifications',
  'billing': 'Billing',
  'api_keys': 'API Keys',
  'account': 'Account',
  'logout': 'Logout',
  'save_changes': 'Save Changes',
  'cancel': 'Cancel',
  'delete': 'Delete',
  'edit': 'Edit',
  'apply': 'Apply',
  'confirm': 'Confirm',
  'search_placeholder': 'Search anything...',
  'user': 'User',
  'messages': 'Messages',
  
  // Dashboard page
  'welcomeTitle': 'Welcome to ArtIntel Dashboard',
  'welcomeDescription': 'Monitor your AI models and analytics in one place',
  'deployModel': 'Deploy Model',
  'launchNewModel': 'Launch a new model',
  'uploadDataset': 'Upload Dataset',
  'addTrainingData': 'Add training data',
  'createAPIKey': 'Create API Key',
  'generateCredentials': 'Generate credentials',
  'inviteTeam': 'Invite Team',
  'addCollaborators': 'Add collaborators',
  'activeModels': 'Active Models',
  'totalInferences': 'Total Inferences',
  'computeHours': 'Compute Hours',
  'activeUsers': 'Active Users',
  'fromLastMonth': 'from last month',
  'fromLastWeek': 'from last week',
  'fromYesterday': 'from yesterday',
  'apiUsageAnalytics': 'API Usage Analytics',
  'monthlyStatisticsForAPICallsAndTokenUsage': 'Monthly statistics for API calls and token usage',
  'usageBilling': 'Usage & Billing',
  'currentPeriodSummary': 'Current period summary',
  'totalTokenUsage': 'Total Token Usage',
  'limit': 'Limit',
  'costBreakdown': 'Cost Breakdown',
  'thisMonth': 'This Month',
  'inference': 'Inference',
  'training': 'Training',
  'storage': 'Storage',
  'total': 'Total',
  'viewBillingDetails': 'View Billing Details',
  'yourAIModels': 'Your AI Models',
  'statusAndPerformanceOfYourDeployedModels': 'Status and performance of your deployed models',
  'model': 'Model',
  'type': 'Type',
  'status': 'Status',
  'metrics': 'Metrics',
  'lastUpdated': 'Last Updated',
  'actions': 'Actions',
  'tokens': 'Tokens',
  'latency': 'Latency',
  'cost': 'Cost',
  'activityFeed': 'Activity Feed',
  'recentSystemEventsAndUserActivities': 'Recent system events and user activities',
  'viewAllActivity': 'View All Activity',
  'systemHealth': 'System Health',
  'realTimeStatusOfSystemComponents': 'Real-time status of system components',
  'serviceStatus': 'Service Status',
  'resourceUtilization': 'Resource Utilization',
  'errorMetrics': 'Error Metrics',
  'apiErrorRate': 'API Error Rate',
  'modelTimeoutRate': 'Model Timeout Rate',
  
  // Models page
  'aiModels': 'Language Models',
  'exploreAndDeployModels': 'Explore and deploy AI models',
  'fineTuneModel': 'Fine-tune Model',
  'compareModels': 'Compare Models',
  'searchModels': 'Search models...',
  'filters': 'Filters',
  'modelType': 'Model Type',
  'allTypes': 'All Types',
  'textGeneration': 'Text Generation',
  'imageGeneration': 'Image Generation',
  'embedding': 'Embedding',
  'classification': 'Classification',
  'multimodal': 'Multimodal',
  'modelSize': 'Model Size',
  'allSizes': 'All Sizes',
  'small': 'Small',
  'medium': 'Medium',
  'large': 'Large',
  'xlarge': 'Extra Large',
  'allStatuses': 'All Statuses',
  'deployed': 'Deployed',
  'available': 'Available',
  'fineTuning': 'Fine-tuning',
  'showBookmarkedOnly': 'Show bookmarked only',
  'resetFilters': 'Reset Filters',
  'noModelsFound': 'No models found',
  'tryAdjustingFilters': 'Try adjusting your search or filters',
  'showing': 'Showing',
  'of': 'of',
  'models': 'models',
  
  // Team Management page
  'teamManagement': 'Team Management',
  'manageTeamMembers': 'Manage team members, roles, and permissions',
  'inviteTeamMember': 'Invite Team Member',
  'searchTeamMembers': 'Search team members...',
  'member': 'Member',
  'role': 'Role',
  'department': 'Department',
  'joinDate': 'Join Date',
  'noTeamMembersFound': 'No team members found',
  'team': 'Team',
  'createTeam': 'Create Team',
  'teamName': 'Team Name',
  'teamDescription': 'Team Description',
  'teamMembers': 'Team Members',
  'addMember': 'Add Member',
  'removeMember': 'Remove Member',
  'roles': 'Roles',
  'permissions': 'Permissions',
  'createRole': 'Create Role',
  'editRole': 'Edit Role',
  'adminRole': 'Admin',
  'memberRole': 'Member',
  'viewerRole': 'Viewer',
  'activeStatus': 'Active',
  'pendingStatus': 'Pending',
  'inactiveStatus': 'Inactive',
  'remove': 'Remove',
  
  // Cost Optimization page
  'costOptimization': 'Cost Optimization',
  'optimizeResourceUsage': 'Optimize resource usage and reduce costs',
  'costOverview': 'Cost Overview',
  'savingOpportunities': 'Saving Opportunities',
  'currentSpending': 'Current Spending',
  'projectedSavings': 'Projected Savings',
  'implementSavings': 'Implement Savings',
  'modelCosts': 'Model Costs',
  'storageCosts': 'Storage Costs',
  'dataTransferCosts': 'Data Transfer Costs',
  'computeCosts': 'Compute Costs',
  'costByResource': 'Cost by Resource',
  'costByService': 'Cost by Service',
  'costByDay': 'Cost by Day',
  'costByMonth': 'Cost by Month',
  'lastSevenDays': 'Last 7 Days',
  'lastThirtyDays': 'Last 30 Days',
  'lastNinetyDays': 'Last 90 Days',
  'customRange': 'Custom Range',
  'budgetTracking': 'Budget Tracking',
  'setBudget': 'Set Budget',
  'savingsRecommendations': 'Savings Recommendations',
  'rightSizing': 'Right-sizing Recommendations',
  'idleResources': 'Idle Resources',
  'savingsEstimate': 'Savings Estimate',
  'implementedSavings': 'Implemented Savings',
  'resourceEfficiency': 'Resource Efficiency',
  'optimizationHistory': 'Optimization History',
  'usageTrends': 'Usage Trends',
  'costAnalytics': 'Cost Analytics',
  'downloadReport': 'Download Report',
  'costAlerts': 'Cost Alerts',
  'createAlert': 'Create Alert',
  'budgetAlert': 'Budget Alert',
  'usageAlert': 'Usage Alert',
  'anomalyAlert': 'Anomaly Alert',
  'setThreshold': 'Set Threshold',
  'saving': 'Saving',
  'optimize': 'Optimize',
  
  // Support page
  'helpSupport': 'Help & Support',
  'findResourcesGetAssistance': 'Find resources, get assistance, and connect with our community',
  'searchHelpArticles': 'Search for help articles, tutorials, and more...',
  'knowledge_base': 'Knowledge Base',
  'knowledge_base_desc': 'Browse articles, guides, and documentation',
  'video_tutorials': 'Video Tutorials',
  'video_tutorials_desc': 'Learn through visual guides and walkthroughs',
  'community': 'Community',
  'community_desc': 'Connect with other users and share knowledge',
  'support_channels': 'Support Channels',
  'support_channels_desc': 'Get direct assistance from our support team',
  'events_&_webinars': 'Events & Webinars',
  'events_&_webinars_desc': 'Join upcoming learning sessions and workshops',
  'ai_assistant': 'AI Assistant',
  'ai_assistant_desc': 'Get instant help with our AI-powered assistant',
  'popularArticles': 'Popular Articles',
  'article_1': 'Getting Started with ArtIntel LLMs',
  'article_2': 'Fine-Tuning Your First Model',
  'article_3': 'Understanding Model Deployment Options',
  'article_4': 'Working with Custom Datasets',
  'article_5': 'Monitoring Model Performance',
  'category_basics': 'Basics',
  'category_fine-tuning': 'Fine-Tuning',
  'category_deployment': 'Deployment',
  'category_data_integration': 'Data Integration',
  'category_analytics': 'Analytics',
  'needDirectAssistance': 'Need Direct Assistance?',
  'supportTeamReady': 'Our support team is ready to help you with any questions or issues',
  'contactSupport': 'Contact Support',
  
  // Profile page
  'personal_information': 'Personal Information',
  'full_name': 'Full Name',
  'email_address': 'Email Address',
  'phone_number': 'Phone Number',
  'company': 'Company',
  'website': 'Website',
  'bio': 'Bio',
  'language_preferences': 'Language Preferences',
  'timezone': 'Timezone',
  'interface_language': 'Interface Language',
  
  // Language names
  'language_en': 'English',
  'language_es': 'Spanish',
  'language_fr': 'French',
  'language_de': 'German',
  'language_ja': 'Japanese',
  'language_zh': 'Chinese',
  
  // Appearance page
  'theme_mode': 'Theme Mode',
  'light_mode': 'Light Mode',
  'dark_mode': 'Dark Mode',
  'system_mode': 'System Mode',
  'accent_color': 'Accent Color',
  'font_family': 'Font Family',
  'font_size': 'Font Size',
  'layout': 'Layout',
  'compact_sidebar': 'Compact Sidebar',
  'show_breadcrumbs': 'Show Breadcrumbs',
  'content_width': 'Content Width',
  'enable_animations': 'Enable Animations',
  'restore_defaults': 'Restore Defaults',
  
  // Security page
  'password': 'Password',
  'current_password': 'Current Password',
  'new_password': 'New Password',
  'confirm_password': 'Confirm Password',
  'two_factor_authentication': '2-Factor Authentication',
  'active_sessions': 'Active Sessions',
  'login_history': 'Login History',
  
  // Messages
  'settings_updated': 'Settings updated successfully',
  'error_updating_settings': 'Error updating settings',
  
  // Language change messages
  'language_changed_successfully': 'Language changed successfully',
  'language_change_note': 'Changes are applied instantly across the dashboard',
  
  // Profile messages
  'profile_updated_successfully': 'Profile updated successfully',
  'error_updating_profile': 'Failed to update profile',
  
  // Datasets page
  'datasets': 'Datasets',
  'datasets_subtitle': 'Manage your training and evaluation datasets',
  'upload_dataset': 'Upload Dataset',
  'connect_cloud_storage': 'Connect Cloud',
  'connect_database_source': 'Connect Database',
  'upload_files': 'Upload Files',
  'drag_drop_files': 'Drag and drop files or click to browse',
  'connect_cloud': 'Connect Cloud',
  'connect_cloud_storage_desc': 'Import from cloud storage providers',
  'connect_database': 'Connect Database',
  'import_from_database': 'Import data from database sources',
  
  // Dataset sharing
  'share_dataset': 'Share Dataset',
  'share_dataset_description': 'Share "{name}" with other hubs',
  'access_level': 'Access Level',
  'read_only': 'Read Only',
  'read_write': 'Read & Write',
  'admin': 'Admin',
  'select_hubs': 'Select Hubs',
  'no_hubs_available': 'No hubs available',
  'members': 'members',
  'sharing': 'Sharing...',
  'share': 'Share',
  'dataset_shared_success': 'Dataset shared successfully',
  'dataset_unshared_success': 'Dataset unshared successfully',
  
  'dataset_name': 'Dataset Name',
  'dataset_description': 'Description',
  'dataset_type': 'Type',
  'dataset_format': 'Format',
  'dataset_size': 'Size',
  'dataset_source': 'Source',
  'dataset_status': 'Status',
  'dataset_tags': 'Tags',
  'dataset_created': 'Created',
  'dataset_updated': 'Updated',
  'dataset_privacy': 'Privacy',
  'dataset_item_count': 'Items',
  'error_loading_datasets': 'Error loading datasets',
  'retry': 'Retry',
  'no_datasets_found': 'No datasets found',
  'create_first_dataset': 'Create your first dataset',
  'filter_datasets': 'Filter Datasets',
  'sort_by': 'Sort By',
  'showing': 'Showing',
  'of': 'of',
  'previous': 'Previous',
  'next': 'Next',
  'delete_dataset_confirm': 'Are you sure you want to delete this dataset?',
  'delete_dataset_warning': 'This action cannot be undone.',
  'download_dataset': 'Download Dataset',
  'view_dataset': 'View Dataset',
  'edit_dataset': 'Edit Dataset',
  'delete_dataset': 'Delete Dataset',
  'loadingDatasets': 'Loading datasets...',
  'thisMayTakeAMoment': 'This may take a moment',
  
  // Settings page
  'search_settings': 'Search settings...',
  'customize_experience': 'Customize your experience and manage your account preferences',
  'quick_access': 'Quick Access',
  'sign_out_all_devices': 'Sign Out from All Devices',
  'secure_account_message': 'Secure your account by signing out from all active sessions',
  'sign_out_everywhere': 'Sign Out Everywhere',
  'signed_out_all_devices': 'Signed out from all devices',
  'profile_settings': 'Profile Settings',
  'profile_settings_desc': 'Manage your personal information and preferences',
  'appearance_desc': 'Customize the look and feel of your dashboard',
  'security_desc': 'Manage passwords, 2FA, and session preferences',
  'notifications_desc': 'Control when and how you receive alerts',
  'billing_subscription': 'Billing & Subscription',
  'billing_desc': 'Manage your plan, payment methods, and billing history',
  'api_keys_desc': 'Create and manage API keys for integration',
  'integrations': 'Integrations',
  'integrations_desc': 'Connect with third-party services and tools',
  'account_management': 'Account Management',
  'account_management_desc': 'Manage verification, data export, and account deletion',
  'change_password': 'Change Password',
  'enable_two_factor': 'Enable Two-Factor Authentication',
  'update_notification_preferences': 'Update Notification Preferences',
  'manage_api_keys': 'Manage API Keys',
  'update_payment_method': 'Update Payment Method',
  
  // Account settings specific keys
  'account_verification': 'Account Verification',
  'email_verification': 'Email Verification',
  'phone_verification': 'Phone Verification',
  'identity_verification': 'Identity Verification',
  'email_verified': 'Your email address ({email}) has been verified.',
  'email_not_verified': 'Your email address has not been verified yet.',
  'phone_verified': 'Your phone number ({phone}) has been verified.',
  'phone_not_verified': 'Your phone number has not been verified yet.',
  'identity_verification_desc': 'Verify your identity to access additional features and increased limits.',
  'verify_email': 'Verify Email',
  'verify_phone': 'Verify Phone Number',
  'start_identity_verification': 'Start Identity Verification',
  'pro_feature': 'Pro Feature',
  'data_management': 'Data Management',
  'export_data': 'Export Your Data',
  'export_data_desc': 'You can request a copy of all your data stored in our system. This includes your profile information, settings, and usage history.',
  'request_data_export': 'Request Data Export',
  'delete_account': 'Delete Your Account',
  'delete_account_desc': 'Permanently delete your account and all associated data. This action cannot be undone.',
  'delete_warning': 'Warning: This action is irreversible',
  'delete_warning_desc': 'Once you delete your account, all your data will be permanently removed from our systems.',
  'type_delete_confirm': 'Type DELETE to confirm',
  'permanently_delete_account': 'Permanently Delete Account',
  'need_account_help': 'Need help with your account? Our support team is available 24/7 to assist you with any questions or issues.',
  'verification_code_sent': 'Verification code sent to your phone',
  'identity_verification_initiated': 'Identity verification process initiated',
  'data_export_initiated': 'Your data export has been initiated. You will receive an email when it is ready.',
  'account_deletion_initiated': 'Account deletion process initiated',
  'please_type_delete': 'Please type DELETE to confirm account deletion',
  
  // Support Channels page
  'support_channels_title': 'Support Channels',
  'support_channels_subtitle': 'Get direct assistance from our support team',
  'live_chat': 'Live Chat',
  'live_chat_desc': 'Get real-time assistance for urgent issues',
  'live_chat_availability': 'Available 24/7 for Pro and Enterprise users',
  'live_chat_action': 'Start Chat',
  'email_support': 'Email Support',
  'email_support_desc': 'Send detailed inquiries for complex questions',
  'email_support_availability': 'Response within 24-48 hours',
  'email_support_action': 'Send Email',
  'support_tickets': 'Support Tickets',
  'support_tickets_desc': 'Track and manage ongoing issues',
  'support_tickets_availability': 'Available for all users',
  'support_tickets_action': 'Create Ticket',
  'phone_support': 'Phone Support',
  'phone_support_desc': 'Direct communication for critical issues',
  'phone_support_availability': 'Business hours (9AM-5PM EST)',
  'phone_support_action': 'View Phone Numbers',
  'video_consultations': 'Video Consultations',
  'video_consultations_desc': 'Screen sharing for complex problems',
  'video_consultations_availability': 'By appointment only',
  'video_consultations_action': 'Schedule Consultation',
  'available_with_tier': 'Available with {tier} tier',
  'support_hours': 'Support Hours',
  'standard_support': 'Standard Support',
  'standard_support_hours': 'Monday - Friday, 9AM - 5PM EST',
  'pro_support': 'Pro Support',
  'pro_support_hours': 'Monday - Friday, 9AM - 8PM EST',
  'enterprise_support': 'Enterprise Support',
  'enterprise_support_hours': '24/7, 365 days',
  'expected_response_times': 'Expected Response Times',
  'free_tier_response': 'Within 48 hours',
  'pro_tier_response': 'Within 24 hours',
  'enterprise_tier_response': 'Within 4 hours',
  'critical_issues_response': 'Within 1 hour',
  'free_tier': 'Free Tier',
  'pro_tier': 'Pro Tier',
  'enterprise_tier': 'Enterprise Tier',
  'critical_issues': 'Critical Issues (Enterprise)',
  
  // Dashboard time ranges
  'time_range_24h': '24h',
  'time_range_7d': '7d',
  'time_range_30d': '30d',
  'time_range_90d': '90d',
  'time_range_all': 'All',
  
  // Model status
  'status_running': 'Running',
  'status_paused': 'Paused',
  'status_degraded': 'Degraded',
  'status_operational': 'Operational',
  
  // Dashboard activity feed
  'activity_model_deployed': '{model} model deployed to production',
  'activity_high_latency': 'High latency detected in {region} region',
  'activity_maintenance_completed': 'Scheduled maintenance completed successfully',
  'activity_invoice_generated': 'Monthly invoice generated: {amount}',
  
  // Time references
  'time_minutes_ago': '{count} minutes ago',
  'time_hours_ago': '{count} hours ago',
  'time_days_ago': '{count} days ago',
  
  // Status labels
  'label_warning': 'Warning',
  'label_error': 'Error',
  'label_info': 'Info',
  'label_success': 'Success',
  
  // System health
  'service_api_gateway': 'API Gateway',
  'service_inference_engine': 'Inference Engine',
  'service_database': 'Database',
  'service_training': 'Training Service',
  'service_storage': 'Storage',
  
  // Miscellaneous UI elements
  'view_billing_details': 'View Billing Details',
};

// Spanish translations
const esTranslations: Record<string, string> = {
  'dashboard': 'Panel de control',
  'settings': 'Configuración',
  'profile': 'Perfil',
  'appearance': 'Apariencia',
  'security': 'Seguridad',
  'notifications': 'Notificaciones',
  'billing': 'Facturación',
  'api_keys': 'Claves API',
  'account': 'Cuenta',
  'logout': 'Cerrar sesión',
  'save_changes': 'Guardar cambios',
  'cancel': 'Cancelar',
  'delete': 'Eliminar',
  'edit': 'Editar',
  'apply': 'Aplicar',
  'confirm': 'Confirmar',
  'search_placeholder': 'Buscar cualquier cosa...',
  'user': 'Usuario',
  'messages': 'Mensajes',
  
  // Dashboard page
  'welcomeTitle': 'Bienvenido al Panel de ArtIntel',
  'welcomeDescription': 'Monitorea tus modelos de IA y análisis en un solo lugar',
  'deployModel': 'Implementar Modelo',
  'launchNewModel': 'Lanzar un nuevo modelo',
  'uploadDataset': 'Subir Conjunto de Datos',
  'addTrainingData': 'Añadir datos de entrenamiento',
  'createAPIKey': 'Crear Clave API',
  'generateCredentials': 'Generar credenciales',
  'inviteTeam': 'Invitar Equipo',
  'addCollaborators': 'Añadir colaboradores',
  'activeModels': 'Modelos Activos',
  'totalInferences': 'Inferencias Totales',
  'computeHours': 'Horas de Cómputo',
  'activeUsers': 'Usuarios Activos',
  'fromLastMonth': 'desde el mes pasado',
  'fromLastWeek': 'desde la semana pasada',
  'fromYesterday': 'desde ayer',
  'apiUsageAnalytics': 'Análisis de Uso de API',
  'monthlyStatisticsForAPICallsAndTokenUsage': 'Estadísticas mensuales de llamadas API y uso de tokens',
  'usageBilling': 'Uso y Facturación',
  'currentPeriodSummary': 'Resumen del período actual',
  'totalTokenUsage': 'Uso Total de Tokens',
  'limit': 'Límite',
  'costBreakdown': 'Desglose de Costos',
  'thisMonth': 'Este Mes',
  'inference': 'Inferencia',
  'training': 'Entrenamiento',
  'storage': 'Almacenamiento',
  'total': 'Total',
  'viewBillingDetails': 'Ver Detalles de Facturación',
  'yourAIModels': 'Tus Modelos de IA',
  'statusAndPerformanceOfYourDeployedModels': 'Estado y rendimiento de tus modelos implementados',
  'model': 'Modelo',
  'type': 'Tipo',
  'status': 'Estado',
  'metrics': 'Métricas',
  'lastUpdated': 'Última Actualización',
  'actions': 'Acciones',
  'tokens': 'Tokens',
  'latency': 'Latencia',
  'cost': 'Costo',
  'activityFeed': 'Actividad Reciente',
  'recentSystemEventsAndUserActivities': 'Eventos recientes del sistema y actividades de usuarios',
  'viewAllActivity': 'Ver Toda la Actividad',
  'systemHealth': 'Salud del Sistema',
  'realTimeStatusOfSystemComponents': 'Estado en tiempo real de los componentes del sistema',
  'serviceStatus': 'Estado del Servicio',
  'resourceUtilization': 'Utilización de Recursos',
  'errorMetrics': 'Métricas de Error',
  'apiErrorRate': 'Tasa de Error de API',
  'modelTimeoutRate': 'Tasa de Tiempo de Espera del Modelo',
  
  // Team Management page
  'teamManagement': 'Gestión de Equipo',
  'manageTeamMembers': 'Gestionar miembros del equipo, roles y permisos',
  'inviteTeamMember': 'Invitar Miembro al Equipo',
  'searchTeamMembers': 'Buscar miembros del equipo...',
  'member': 'Miembro',
  'role': 'Rol',
  'department': 'Departamento',
  'joinDate': 'Fecha de Ingreso',
  'noTeamMembersFound': 'No se encontraron miembros del equipo',
  'team': 'Equipo',
  'createTeam': 'Crear Equipo',
  'teamName': 'Nombre del Equipo',
  'teamDescription': 'Descripción del Equipo',
  'teamMembers': 'Miembros del Equipo',
  'addMember': 'Añadir Miembro',
  'removeMember': 'Eliminar Miembro',
  'roles': 'Roles',
  'permissions': 'Permisos',
  'createRole': 'Crear Rol',
  'editRole': 'Editar Rol',
  'adminRole': 'Administrador',
  'memberRole': 'Miembro',
  'viewerRole': 'Visualizador',
  'activeStatus': 'Activo',
  'pendingStatus': 'Pendiente',
  'inactiveStatus': 'Inactivo',
  'remove': 'Eliminar',
  
  // Cost Optimization page
  'costOptimization': 'Optimización de Costos',
  'optimizeResourceUsage': 'Optimizar el uso de recursos y reducir costos',
  'costOverview': 'Resumen de Costos',
  'savingOpportunities': 'Oportunidades de Ahorro',
  'currentSpending': 'Gasto Actual',
  'projectedSavings': 'Ahorros Proyectados',
  'implementSavings': 'Implementar Ahorros',
  'modelCosts': 'Costos de Modelos',
  'storageCosts': 'Costos de Almacenamiento',
  'dataTransferCosts': 'Costos de Transferencia de Datos',
  'computeCosts': 'Costos de Cómputo',
  'costByResource': 'Costo por Recurso',
  'costByService': 'Costo por Servicio',
  'costByDay': 'Costo por Día',
  'costByMonth': 'Costo por Mes',
  'lastSevenDays': 'Últimos 7 Días',
  'lastThirtyDays': 'Últimos 30 Días',
  'lastNinetyDays': 'Últimos 90 Días',
  'customRange': 'Rango Personalizado',
  'budgetTracking': 'Seguimiento de Presupuesto',
  'setBudget': 'Establecer Presupuesto',
  'savingsRecommendations': 'Recomendaciones de Ahorro',
  'rightSizing': 'Recomendaciones de Dimensionamiento',
  'idleResources': 'Recursos Inactivos',
  'savingsEstimate': 'Estimación de Ahorro',
  'implementedSavings': 'Ahorros Implementados',
  'resourceEfficiency': 'Eficiencia de Recursos',
  'optimizationHistory': 'Historial de Optimización',
  'usageTrends': 'Tendencias de Uso',
  'costAnalytics': 'Análisis de Costos',
  'downloadReport': 'Descargar Informe',
  'costAlerts': 'Alertas de Costo',
  'createAlert': 'Crear Alerta',
  'budgetAlert': 'Alerta de Presupuesto',
  'usageAlert': 'Alerta de Uso',
  'anomalyAlert': 'Alerta de Anomalía',
  'setThreshold': 'Establecer Umbral',
  'saving': 'Ahorro',
  'optimize': 'Optimizar',
  
  // Models page
  'aiModels': 'Modelos de IA',
  'exploreAndDeployModels': 'Explora e implementa modelos de IA',
  'fineTuneModel': 'Ajustar Modelo',
  'compareModels': 'Comparar Modelos',
  'searchModels': 'Buscar modelos...',
  'filters': 'Filtros',
  'modelType': 'Tipo de Modelo',
  'allTypes': 'Todos los Tipos',
  'textGeneration': 'Generación de Texto',
  'imageGeneration': 'Generación de Imágenes',
  'embedding': 'Incrustación',
  'classification': 'Clasificación',
  'multimodal': 'Multimodal',
  'modelSize': 'Tamaño del Modelo',
  'allSizes': 'Todos los Tamaños',
  'small': 'Pequeño',
  'medium': 'Mediano',
  'large': 'Grande',
  'xlarge': 'Extra Grande',
  'allStatuses': 'Todos los Estados',
  'deployed': 'Implementado',
  'available': 'Disponible',
  'fineTuning': 'En ajuste',
  'showBookmarkedOnly': 'Mostrar solo marcados',
  'resetFilters': 'Restablecer Filtros',
  'noModelsFound': 'No se encontraron modelos',
  'tryAdjustingFilters': 'Intenta ajustar tu búsqueda o filtros',
  'showing': 'Mostrando',
  'of': 'de',
  'models': 'modelos',
  
  // Support page
  'helpSupport': 'Ayuda y Soporte',
  'findResourcesGetAssistance': 'Encuentra recursos, obtén asistencia y conéctate con nuestra comunidad',
  'searchHelpArticles': 'Buscar artículos de ayuda, tutoriales y más...',
  'knowledge_base': 'Base de Conocimientos',
  'knowledge_base_desc': 'Explora artículos, guías y documentación',
  'video_tutorials': 'Tutoriales en Video',
  'video_tutorials_desc': 'Aprende a través de guías visuales y tutoriales',
  'community': 'Comunidad',
  'community_desc': 'Conéctate con otros usuarios y comparte conocimientos',
  'support_channels': 'Canales de Soporte',
  'support_channels_desc': 'Obtén asistencia directa de nuestro equipo de soporte',
  'events_&_webinars': 'Eventos y Webinars',
  'events_&_webinars_desc': 'Únete a próximas sesiones de aprendizaje y talleres',
  'ai_assistant': 'Asistente de IA',
  'ai_assistant_desc': 'Obtén ayuda instantánea con nuestro asistente impulsado por IA',
  'popularArticles': 'Artículos Populares',
  'article_1': 'Primeros pasos con ArtIntel LLMs',
  'article_2': 'Ajustando tu primer modelo',
  'article_3': 'Entendiendo las opciones de implementación de modelos',
  'article_4': 'Trabajando con conjuntos de datos personalizados',
  'article_5': 'Monitoreando el rendimiento del modelo',
  'category_basics': 'Conceptos básicos',
  'category_fine-tuning': 'Ajuste fino',
  'category_deployment': 'Implementación',
  'category_data_integration': 'Integración de datos',
  'category_analytics': 'Analítica',
  'needDirectAssistance': '¿Necesitas asistencia directa?',
  'supportTeamReady': 'Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta o problema',
  'contactSupport': 'Contactar Soporte',
  
  // Profile page
  'personal_information': 'Información personal',
  'full_name': 'Nombre completo',
  'email_address': 'Correo electrónico',
  'phone_number': 'Número de teléfono',
  'company': 'Empresa',
  'website': 'Sitio web',
  'bio': 'Biografía',
  'language_preferences': 'Preferencias de idioma',
  'timezone': 'Zona horaria',
  'interface_language': 'Idioma de la interfaz',
  
  'language_en': 'Inglés',
  'language_es': 'Español',
  'language_fr': 'Francés',
  'language_de': 'Alemán',
  'language_ja': 'Japonés',
  'language_zh': 'Chino',
  
  'theme_mode': 'Modo de tema',
  'light_mode': 'Modo claro',
  'dark_mode': 'Modo oscuro',
  'system_mode': 'Modo del sistema',
  'accent_color': 'Color de acento',
  'font_family': 'Familia de fuente',
  'font_size': 'Tamaño de fuente',
  'layout': 'Diseño',
  'compact_sidebar': 'Barra lateral compacta',
  'show_breadcrumbs': 'Mostrar migas de pan',
  'content_width': 'Ancho del contenido',
  'enable_animations': 'Habilitar animaciones',
  'restore_defaults': 'Restaurar valores predeterminados',
  
  'password': 'Contraseña',
  'current_password': 'Contraseña actual',
  'new_password': 'Nueva contraseña',
  'confirm_password': 'Confirmar contraseña',
  'two_factor_authentication': 'Autenticación de 2 factores',
  'active_sessions': 'Sesiones activas',
  'login_history': 'Historial de inicios de sesión',
  
  'settings_updated': 'Configuración actualizada con éxito',
  'error_updating_settings': 'Error al actualizar la configuración',
  
  // Language change messages
  'language_changed_successfully': 'Idioma cambiado exitosamente',
  'language_change_note': 'Los cambios se aplican instantáneamente en el panel',
  
  // Profile messages
  'profile_updated_successfully': 'Perfil actualizado con éxito',
  'error_updating_profile': 'Error al actualizar el perfil',
  
  // Datasets page
  'datasets': 'Conjuntos de Datos',
  'datasets_subtitle': 'Administre sus conjuntos de datos de entrenamiento y evaluación',
  'upload_dataset': 'Cargar Conjunto de Datos',
  'connect_cloud': 'Conectar a la Nube',
  'connect_database': 'Conectar a la Base de Datos',
  'uploadFiles': 'Cargar Archivos',
  'dragDropFiles': 'Arrastre y suelte archivos o haga clic para buscar',
  'connectCloud': 'Conectar a la Nube',
  'connectCloudStorage': 'Importar desde proveedores de almacenamiento en la nube',
  'connectDatabase': 'Conectar a la Base de Datos',
  'importFromDatabase': 'Importar datos de fuentes de base de datos',
  'dataset_name': 'Nombre del Conjunto de Datos',
  'dataset_description': 'Descripción',
  'dataset_type': 'Tipo',
  'dataset_format': 'Formato',
  'dataset_size': 'Tamaño',
  'dataset_source': 'Origen',
  'dataset_status': 'Estado',
  'dataset_tags': 'Etiquetas',
  'dataset_created': 'Creado',
  'dataset_updated': 'Actualizado',
  'dataset_privacy': 'Privacidad',
  'dataset_item_count': 'Elementos',
  'error_loading_datasets': 'Error al cargar conjuntos de datos',
  'retry': 'Reintentar',
  'no_datasets_found': 'No se encontraron conjuntos de datos',
  'create_first_dataset': 'Cree su primer conjunto de datos',
  'filter_datasets': 'Filtrar Conjuntos de Datos',
  'sort_by': 'Ordenar por',
  'showing': 'Mostrando',
  'of': 'de',
  'previous': 'Anterior',
  'next': 'Siguiente',
  'delete_dataset_confirm': '¿Está seguro de que desea eliminar este conjunto de datos?',
  'delete_dataset_warning': 'Esta acción no se puede deshacer.',
  'download_dataset': 'Descargar Conjunto de Datos',
  'view_dataset': 'Ver Conjunto de Datos',
  'edit_dataset': 'Editar Conjunto de Datos',
  'delete_dataset': 'Eliminar Conjunto de Datos',
  'loadingDatasets': 'Cargando conjuntos de datos...',
  'thisMayTakeAMoment': 'Esto puede tomar un momento',
  
  // Settings page
  'search_settings': 'Buscar configuraciones...',
  'customize_experience': 'Personalice su experiencia y administre las preferencias de su cuenta',
  'quick_access': 'Acceso rápido',
  'sign_out_all_devices': 'Cerrar sesión en todos los dispositivos',
  'secure_account_message': 'Asegure su cuenta cerrando sesión en todas las sesiones activas',
  'sign_out_everywhere': 'Cerrar sesión en todas partes',
  'signed_out_all_devices': 'Se ha cerrado sesión en todos los dispositivos',
  'profile_settings': 'Configuración del Perfil',
  'profile_settings_desc': 'Administre su información personal y preferencias',
  'appearance_desc': 'Personalice la apariencia de su panel de control',
  'security_desc': 'Administre contraseñas, 2FA y preferencias de sesión',
  'notifications_desc': 'Controle cuándo y cómo recibe alertas',
  'billing_subscription': 'Facturación y Suscripción',
  'billing_desc': 'Administre su plan, métodos de pago e historial de facturación',
  'api_keys_desc': 'Cree y administre claves API para integración',
  'integrations': 'Integraciones',
  'integrations_desc': 'Conéctese con servicios y herramientas de terceros',
  'account_management': 'Administración de Cuenta',
  'account_management_desc': 'Administre verificación, exportación de datos y eliminación de cuenta',
  'change_password': 'Cambiar Contraseña',
  'enable_two_factor': 'Habilitar Autenticación de Dos Factores',
  'update_notification_preferences': 'Actualizar Preferencias de Notificación',
  'manage_api_keys': 'Administrar Claves API',
  'update_payment_method': 'Actualizar Método de Pago',
  
  // Account settings specific keys
  'account_verification': 'Verificación de Cuenta',
  'email_verification': 'Verificación de Correo',
  'phone_verification': 'Verificación de Teléfono',
  'identity_verification': 'Verificación de Identidad',
  'email_verified': 'Su dirección de correo electrónico ({email}) ha sido verificada.',
  'email_not_verified': 'Su dirección de correo electrónico aún no ha sido verificada.',
  'phone_verified': 'Su número de teléfono ({phone}) ha sido verificado.',
  'phone_not_verified': 'Su número de teléfono aún no ha sido verificado.',
  'identity_verification_desc': 'Verifique su identidad para acceder a funciones adicionales y límites aumentados.',
  'verify_email': 'Verificar Correo',
  'verify_phone': 'Verificar Número de Teléfono',
  'start_identity_verification': 'Iniciar Verificación de Identidad',
  'pro_feature': 'Función Pro',
  'data_management': 'Gestión de Datos',
  'export_data': 'Exportar Sus Datos',
  'export_data_desc': 'Puede solicitar una copia de todos sus datos almacenados en nuestro sistema. Esto incluye su información de perfil, configuraciones e historial de uso.',
  'request_data_export': 'Solicitar Exportación de Datos',
  'delete_account': 'Eliminar Su Cuenta',
  'delete_account_desc': 'Eliminar permanentemente su cuenta y todos los datos asociados. Esta acción no se puede deshacer.',
  'delete_warning': 'Advertencia: Esta acción es irreversible',
  'delete_warning_desc': 'Una vez que elimine su cuenta, todos sus datos serán eliminados permanentemente de nuestros sistemas.',
  'type_delete_confirm': 'Escriba DELETE para confirmar',
  'permanently_delete_account': 'Eliminar Cuenta Permanentemente',
  'need_account_help': '¿Necesita ayuda con su cuenta? Nuestro equipo de soporte está disponible 24/7 para asistirle con cualquier pregunta o problema.',
  'verification_code_sent': 'Código de verificación enviado a su teléfono',
  'identity_verification_initiated': 'Proceso de verificación de identidad iniciado',
  'data_export_initiated': 'Se ha iniciado la exportación de sus datos. Recibirá un correo electrónico cuando esté lista.',
  'account_deletion_initiated': 'Proceso de eliminación de cuenta iniciado',
  'please_type_delete': 'Por favor escriba DELETE para confirmar la eliminación de la cuenta',
  
  // Support Channels page
  'support_channels_title': 'Canales de Soporte',
  'support_channels_subtitle': 'Obtenga asistencia directa de nuestro equipo de soporte',
  'live_chat': 'Chat en Vivo',
  'live_chat_desc': 'Obtenga asistencia en tiempo real para problemas urgentes',
  'live_chat_availability': 'Disponible 24/7 para usuarios Pro y Enterprise',
  'live_chat_action': 'Iniciar Chat',
  'email_support': 'Soporte por Correo',
  'email_support_desc': 'Envíe consultas detalladas para preguntas complejas',
  'email_support_availability': 'Respuesta en 24-48 horas',
  'email_support_action': 'Enviar Correo',
  'support_tickets': 'Tickets de Soporte',
  'support_tickets_desc': 'Seguimiento y gestión de problemas en curso',
  'support_tickets_availability': 'Disponible para todos los usuarios',
  'support_tickets_action': 'Crear Ticket',
  'phone_support': 'Soporte Telefónico',
  'phone_support_desc': 'Comunicación directa para problemas críticos',
  'phone_support_availability': 'Horario laboral (9AM-5PM EST)',
  'phone_support_action': 'Ver Números de Teléfono',
  'video_consultations': 'Consultas por Video',
  'video_consultations_desc': 'Compartir pantalla para problemas complejos',
  'video_consultations_availability': 'Solo con cita previa',
  'video_consultations_action': 'Programar Consulta',
  'available_with_tier': 'Disponible con el plan {tier}',
  'support_hours': 'Horarios de Soporte',
  'standard_support': 'Soporte Estándar',
  'standard_support_hours': 'Lunes - Viernes, 9AM - 5PM EST',
  'pro_support': 'Soporte Pro',
  'pro_support_hours': 'Lunes - Viernes, 9AM - 8PM EST',
  'enterprise_support': 'Soporte Enterprise',
  'enterprise_support_hours': '24/7, 365 días',
  'expected_response_times': 'Tiempos de Respuesta Esperados',
  'free_tier_response': 'En 48 horas',
  'pro_tier_response': 'En 24 horas',
  'enterprise_tier_response': 'En 4 horas',
  'critical_issues_response': 'En 1 hora',
  'free_tier': 'Plan Gratuito',
  'pro_tier': 'Plan Pro',
  'enterprise_tier': 'Plan Enterprise',
  'critical_issues': 'Problemas Críticos (Enterprise)',
  
  // Dashboard time ranges
  'time_range_24h': '24h',
  'time_range_7d': '7d',
  'time_range_30d': '30d',
  'time_range_90d': '90d',
  'time_range_all': 'All',
  
  // Model status
  'status_running': 'Ejecutando',
  'status_paused': 'Pausado',
  'status_degraded': 'Degradado',
  'status_operational': 'Operativo',
  
  // Dashboard activity feed
  'activity_model_deployed': 'Modelo {model} implementado en producción',
  'activity_high_latency': 'Alta latencia detectada en la región {region}',
  'activity_maintenance_completed': 'Mantenimiento programado completado con éxito',
  'activity_invoice_generated': 'Factura mensual generada: {amount}',
  
  // Time references
  'time_minutes_ago': 'hace {count} minutos',
  'time_hours_ago': 'hace {count} horas',
  'time_days_ago': 'hace {count} días',
  
  // Status labels
  'label_warning': 'Advertencia',
  'label_error': 'Error',
  'label_info': 'Información',
  'label_success': 'Éxito',
  
  // System health
  'service_api_gateway': 'Puerta de Enlace API',
  'service_inference_engine': 'Motor de Inferencia',
  'service_database': 'Base de Datos',
  'service_training': 'Servicio de Entrenamiento',
  'service_storage': 'Almacenamiento',
  
  // Miscellaneous UI elements
  'view_billing_details': 'Ver Detalles de Facturación',
};

// French translations
const frTranslations: Record<string, string> = {
  'dashboard': 'Tableau de bord',
  'settings': 'Paramètres',
  'profile': 'Profil',
  'appearance': 'Apparence',
  'security': 'Sécurité',
  'notifications': 'Notifications',
  'billing': 'Facturation',
  'api_keys': 'Clés API',
  'account': 'Compte',
  'logout': 'Déconnexion',
  'save_changes': 'Enregistrer les modifications',
  'cancel': 'Annuler',
  'delete': 'Supprimer',
  'edit': 'Modifier',
  'apply': 'Appliquer',
  'confirm': 'Confirmer',
  'search_placeholder': 'Rechercher...',
  'user': 'Utilisateur',
  'messages': 'Messages',
  
  'personal_information': 'Informations personnelles',
  'full_name': 'Nom complet',
  'email_address': 'Adresse e-mail',
  'phone_number': 'Numéro de téléphone',
  'company': 'Entreprise',
  'website': 'Site web',
  'bio': 'Biographie',
  'language_preferences': 'Préférences linguistiques',
  'timezone': 'Fuseau horaire',
  'interface_language': 'Langue d\'interface',
  
  'language_en': 'Anglais',
  'language_es': 'Espagnol',
  'language_fr': 'Français',
  'language_de': 'Allemand',
  'language_ja': 'Japonais',
  'language_zh': 'Chinois',
  
  'theme_mode': 'Mode de thème',
  'light_mode': 'Mode clair',
  'dark_mode': 'Mode sombre',
  'system_mode': 'Mode système',
  'accent_color': 'Couleur d\'accent',
  'font_family': 'Famille de police',
  'font_size': 'Taille de police',
  'layout': 'Disposition',
  'compact_sidebar': 'Barre latérale compacte',
  'show_breadcrumbs': 'Afficher le fil d\'Ariane',
  'content_width': 'Largeur du contenu',
  'enable_animations': 'Activer les animations',
  'restore_defaults': 'Restaurer les paramètres par défaut',
  
  'password': 'Mot de passe',
  'current_password': 'Mot de passe actuel',
  'new_password': 'Nouveau mot de passe',
  'confirm_password': 'Confirmer le mot de passe',
  'two_factor_authentication': 'Authentification à 2 facteurs',
  'active_sessions': 'Sessions actives',
  'login_history': 'Historique des connexions',
  
  'settings_updated': 'Paramètres mis à jour avec succès',
  'error_updating_settings': 'Erreur lors de la mise à jour des paramètres',
  
  // Language change messages
  'language_changed_successfully': 'Langue changée avec succès',
  'language_change_note': 'Les changements sont appliqués instantanément dans le tableau de bord',
  
  // Profile messages
  'profile_updated_successfully': 'Profil mis à jour avec succès',
  'error_updating_profile': 'Échec de la mise à jour du profil',
  
  // Team Management page
  'teamManagement': 'Gestion d\'Équipe',
  'manageTeamMembers': 'Gérer les membres de l\'équipe, les rôles et les permissions',
  'inviteTeamMember': 'Inviter un Membre',
  'searchTeamMembers': 'Rechercher des membres...',
  'member': 'Membre',
  'role': 'Rôle',
  'department': 'Département',
  'joinDate': 'Date d\'Adhésion',
  'noTeamMembersFound': 'Aucun membre d\'équipe trouvé',
  'team': 'Équipe',
  'createTeam': 'Créer une Équipe',
  'teamName': 'Nom de l\'Équipe',
  'teamDescription': 'Description de l\'Équipe',
  'teamMembers': 'Membres de l\'Équipe',
  'addMember': 'Ajouter un Membre',
  'removeMember': 'Supprimer un Membre',
  'roles': 'Rôles',
  'permissions': 'Permissions',
  'createRole': 'Créer un Rôle',
  'editRole': 'Modifier un Rôle',
  'adminRole': 'Administrateur',
  'memberRole': 'Membre',
  'viewerRole': 'Visualiseur',
  'activeStatus': 'Actif',
  'pendingStatus': 'En attente',
  'inactiveStatus': 'Inactif',
  'remove': 'Supprimer',
  
  // Cost Optimization page
  'costOptimization': 'Optimisation des Coûts',
  'optimizeResourceUsage': 'Optimiser l\'utilisation des ressources et réduire les coûts',
  'costOverview': 'Aperçu des Coûts',
  'savingOpportunities': 'Opportunités d\'Économies',
  'currentSpending': 'Dépenses Actuelles',
  'projectedSavings': 'Économies Projetées',
  'implementSavings': 'Mettre en Œuvre les Économies',
  'modelCosts': 'Coûts des Modèles',
  'storageCosts': 'Coûts de Stockage',
  'dataTransferCosts': 'Coûts de Transfert de Données',
  'computeCosts': 'Coûts de Calcul',
  'costByResource': 'Coût par Ressource',
  'costByService': 'Coût par Service',
  'costByDay': 'Coût par Jour',
  'costByMonth': 'Coût par Mois',
  'lastSevenDays': '7 Derniers Jours',
  'lastThirtyDays': '30 Derniers Jours',
  'lastNinetyDays': '90 Derniers Jours',
  'customRange': 'Plage Personnalisée',
  'budgetTracking': 'Suivi du Budget',
  'setBudget': 'Définir le Budget',
  'savingsRecommendations': 'Recommandations d\'Économies',
  'rightSizing': 'Recommandations de Dimensionnement',
  'idleResources': 'Ressources Inactives',
  'savingsEstimate': 'Estimation des Économies',
  'implementedSavings': 'Économies Mises en Œuvre',
  'resourceEfficiency': 'Efficacité des Ressources',
  'optimizationHistory': 'Historique d\'Optimisation',
  'usageTrends': 'Tendances d\'Utilisation',
  'costAnalytics': 'Analyse des Coûts',
  'downloadReport': 'Télécharger le Rapport',
  'costAlerts': 'Alertes de Coûts',
  'createAlert': 'Créer une Alerte',
  'budgetAlert': 'Alerte de Budget',
  'usageAlert': 'Alerte d\'Utilisation',
  'anomalyAlert': 'Alerte d\'Anomalie',
  'setThreshold': 'Définir le Seuil',
  'saving': 'Économie',
  'optimize': 'Optimiser'
};

// German translations
const deTranslations: Record<string, string> = {
  'dashboard': 'Dashboard',
  'settings': 'Einstellungen',
  'profile': 'Profil',
  'appearance': 'Erscheinungsbild',
  'security': 'Sicherheit',
  'notifications': 'Benachrichtigungen',
  'billing': 'Abrechnung',
  'api_keys': 'API-Schlüssel',
  'account': 'Konto',
  'logout': 'Abmelden',
  'save_changes': 'Änderungen speichern',
  'cancel': 'Abbrechen',
  'delete': 'Löschen',
  'edit': 'Bearbeiten',
  'apply': 'Anwenden',
  'confirm': 'Bestätigen',
  'search_placeholder': 'Suchen...',
  'user': 'Benutzer',
  'messages': 'Nachrichten',
  
  'personal_information': 'Persönliche Informationen',
  'full_name': 'Vollständiger Name',
  'email_address': 'E-Mail-Adresse',
  'phone_number': 'Telefonnummer',
  'company': 'Unternehmen',
  'website': 'Webseite',
  'bio': 'Biographie',
  'language_preferences': 'Spracheinstellungen',
  'timezone': 'Zeitzone',
  'interface_language': 'Oberflächensprache',
  
  'language_en': 'Englisch',
  'language_es': 'Spanisch',
  'language_fr': 'Französisch',
  'language_de': 'Deutsch',
  'language_ja': 'Japanisch',
  'language_zh': 'Chinesisch',
  
  'theme_mode': 'Themenmodus',
  'light_mode': 'Heller Modus',
  'dark_mode': 'Dunkler Modus',
  'system_mode': 'Systemmodus',
  'accent_color': 'Akzentfarbe',
  'font_family': 'Schriftart',
  'font_size': 'Schriftgröße',
  'layout': 'Layout',
  'compact_sidebar': 'Kompakte Seitenleiste',
  'show_breadcrumbs': 'Breadcrumbs anzeigen',
  'content_width': 'Inhaltsbreite',
  'enable_animations': 'Animationen aktivieren',
  'restore_defaults': 'Standardeinstellungen wiederherstellen',
  
  'password': 'Passwort',
  'current_password': 'Aktuelles Passwort',
  'new_password': 'Neues Passwort',
  'confirm_password': 'Passwort bestätigen',
  'two_factor_authentication': '2-Faktor-Authentifizierung',
  'active_sessions': 'Aktive Sitzungen',
  'login_history': 'Anmeldeverlauf',
  
  'settings_updated': 'Einstellungen erfolgreich aktualisiert',
  'error_updating_settings': 'Fehler beim Aktualisieren der Einstellungen',
  
  // Language change messages
  'language_changed_successfully': 'Sprache erfolgreich geändert',
  'language_change_note': 'Änderungen werden sofort im Dashboard angewendet',
  
  // Profile messages
  'profile_updated_successfully': 'Profil erfolgreich aktualisiert',
  'error_updating_profile': 'Fehler beim Aktualisieren des Profils'
};

// Japanese translations
const jaTranslations: Record<string, string> = {
  'dashboard': 'ダッシュボード',
  'settings': '設定',
  'profile': 'プロフィール',
  'appearance': '外観',
  'security': 'セキュリティ',
  'notifications': '通知',
  'billing': '請求',
  'api_keys': 'APIキー',
  'account': 'アカウント',
  'logout': 'ログアウト',
  'save_changes': '変更を保存',
  'cancel': 'キャンセル',
  'delete': '削除',
  'edit': '編集',
  'apply': '適用',
  'confirm': '確認',
  'search_placeholder': '何でも検索...',
  'user': 'ユーザー',
  'messages': 'メッセージ',
  
  'personal_information': '個人情報',
  'full_name': '氏名',
  'email_address': 'メールアドレス',
  'phone_number': '電話番号',
  'company': '会社',
  'website': 'ウェブサイト',
  'bio': '自己紹介',
  'language_preferences': '言語設定',
  'timezone': 'タイムゾーン',
  'interface_language': 'インターフェース言語',
  
  'language_en': '英語',
  'language_es': 'スペイン語',
  'language_fr': 'フランス語',
  'language_de': 'ドイツ語',
  'language_ja': '日本語',
  'language_zh': '中国語',
  
  'theme_mode': 'テーマモード',
  'light_mode': 'ライトモード',
  'dark_mode': 'ダークモード',
  'system_mode': 'システムモード',
  'accent_color': 'アクセントカラー',
  'font_family': 'フォントファミリー',
  'font_size': 'フォントサイズ',
  'layout': 'レイアウト',
  'compact_sidebar': 'コンパクトサイドバー',
  'show_breadcrumbs': 'パンくずリストを表示',
  'content_width': 'コンテンツ幅',
  'enable_animations': 'アニメーションを有効化',
  'restore_defaults': 'デフォルトに戻す',
  
  'password': 'パスワード',
  'current_password': '現在のパスワード',
  'new_password': '新しいパスワード',
  'confirm_password': 'パスワードの確認',
  'two_factor_authentication': '二要素認証',
  'active_sessions': 'アクティブなセッション',
  'login_history': 'ログイン履歴',
  
  'settings_updated': '設定が正常に更新されました',
  'error_updating_settings': '設定の更新中にエラーが発生しました',
  
  // Language change messages
  'language_changed_successfully': '言語が正常に変更されました',
  'language_change_note': '変更はダッシュボード全体に即座に適用されます',
  
  // Profile messages
  'profile_updated_successfully': 'プロフィールが正常に更新されました',
  'error_updating_profile': 'プロフィールの更新に失敗しました'
};

// Chinese translations
const zhTranslations: Record<string, string> = {
  'dashboard': '仪表板',
  'settings': '设置',
  'profile': '个人资料',
  'appearance': '外观',
  'security': '安全',
  'notifications': '通知',
  'billing': '账单',
  'api_keys': 'API密钥',
  'account': '账户',
  'logout': '登出',
  'save_changes': '保存更改',
  'cancel': '取消',
  'delete': '删除',
  'edit': '编辑',
  'apply': '应用',
  'confirm': '确认',
  'search_placeholder': '搜索任何内容...',
  'user': '用户',
  'messages': '消息',
  
  'personal_information': '个人信息',
  'full_name': '全名',
  'email_address': '电子邮件地址',
  'phone_number': '电话号码',
  'company': '公司',
  'website': '网站',
  'bio': '简介',
  'language_preferences': '语言偏好',
  'timezone': '时区',
  'interface_language': '界面语言',
  
  'language_en': '英语',
  'language_es': '西班牙语',
  'language_fr': '法语',
  'language_de': '德语',
  'language_ja': '日语',
  'language_zh': '中文',
  
  'theme_mode': '主题模式',
  'light_mode': '浅色模式',
  'dark_mode': '深色模式',
  'system_mode': '系统模式',
  'accent_color': '强调色',
  'font_family': '字体家族',
  'font_size': '字体大小',
  'layout': '布局',
  'compact_sidebar': '紧凑侧边栏',
  'show_breadcrumbs': '显示面包屑',
  'content_width': '内容宽度',
  'enable_animations': '启用动画',
  'restore_defaults': '恢复默认值',
  
  'password': '密码',
  'current_password': '当前密码',
  'new_password': '新密码',
  'confirm_password': '确认密码',
  'two_factor_authentication': '两因素认证',
  'active_sessions': '活动会话',
  'login_history': '登录历史',
  
  'settings_updated': '设置已成功更新',
  'error_updating_settings': '更新设置时出错',
  
  // Language change messages
  'language_changed_successfully': '语言已成功更改',
  'language_change_note': '更改立即应用于整个仪表板',
  
  // Profile messages
  'profile_updated_successfully': '个人资料已成功更新',
  'error_updating_profile': '更新个人资料失败'
};

// Map language codes to translation objects
const translationsByLanguage: Record<Language, Record<string, string>> = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  ja: jaTranslations,
  zh: zhTranslations
};

// AutoTranslate component that recursively translates text content in child components
interface AutoTranslateProps {
  children: ReactNode;
}

export function AutoTranslate({ children }: AutoTranslateProps) {
  const { t, autoTranslationEnabled } = useLanguage();
  
  if (!autoTranslationEnabled) {
    return <>{children}</>;
  }
  
  // Function to recursively process and translate child elements
  const processChildren = (children: ReactNode): ReactNode => {
    if (!children) return children;
    
    // Handle string children directly - this is where translation happens
    if (typeof children === 'string') {
      return t(children.trim()) || children;
    }
    
    // Handle arrays of children
    if (Array.isArray(children)) {
      return children.map((child) => processChildren(child));
    }
    
    // Handle React elements
    if (React.isValidElement(children)) {
      // Skip processing for certain element types that shouldn't be translated
      if (
        children.type === 'code' ||
        children.type === 'pre' ||
        (typeof children.type === 'string' && children.type.startsWith('h'))
      ) {
        return children;
      }
      
      // Process children recursively - using type assertion to inform TypeScript
      // that we've already checked this is a valid React element with props
      const childProps = children.props as Record<string, any>;
      const newChildren = processChildren(childProps.children);
      
      // Clone the element with processed children
      return React.cloneElement(
        children,
        childProps, // Using the typed props
        newChildren // Passing as children parameter instead of in props object
      );
    }
    
    // Return other node types as-is
    return children;
  };
  
  return <>{processChildren(children)}</>;
}

// Language Provider component
interface LanguageProviderProps {
  children: ReactNode;
  autoTranslate?: boolean;
}

export function LanguageProvider({ children, autoTranslate = false }: LanguageProviderProps) {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState(enTranslations);
  const [autoTranslationEnabled, setAutoTranslationEnabled] = useState(autoTranslate);
  
  // Function to set language and update localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setTranslations(translationsByLanguage[newLanguage]);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };
  
  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };
  
  // Initialize from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage && Object.keys(translationsByLanguage).includes(savedLanguage)) {
        setLanguageState(savedLanguage);
        setTranslations(translationsByLanguage[savedLanguage]);
      }
    }
  }, []);
  
  // Provide context value
  const contextValue = {
    language,
    setLanguage,
    translations,
    t,
    autoTranslationEnabled,
    setAutoTranslationEnabled
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {autoTranslate ? <AutoTranslate>{children}</AutoTranslate> : children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Custom hook for directly using auto-translation in specific components
export function useAutoTranslate(content: ReactNode, enable: boolean = true): ReactNode {
  const { autoTranslationEnabled } = useLanguage();
  
  // Use the AutoTranslate component to process the content
  return (
    <AutoTranslate>
      {enable && autoTranslationEnabled ? content : content}
    </AutoTranslate>
  );
} 