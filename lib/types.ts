
import { getLocalTimeZone, ZonedDateTime } from "@internationalized/date";

export interface VerifiedUser {
    id: number | string;
    name: string;
    email: string;
    role: string;
    token: string;
}
export interface UserNotificationState {
    status: string;
    message: string;
    notifications: UserNotification[];
    total_pages: number;
    total: number;
    current_page: number;
    has_next: boolean;
    has_previous: boolean;
    counts: UserNotificationCounts;
}
export interface UserNotificationCounts {
    read: number;
    archived: number;
    delivered: number;
    action_complete: number;
}

export interface UserNotification {
    id: number;
    user: number;
    sender: string;
    notification_uuid: string;
    channel: string;
    title: string;
    report_type: string;
    message: string;
    created_at: ZonedDateTime;
    delivered_at: ZonedDateTime | null;
    updated_at: ZonedDateTime | null;
    status: string;
    event: string;
    is_delivered: boolean;
    is_important: boolean;
    files: NotificationFile[];
}

export interface NotificationFile {
    id: number;
    file_name: string;
    file_size: string;
    file_type: string;
    file_url: string;
    created_at: ZonedDateTime;
}


// You can replace this with your actual booking response type
export interface MyBookingResponse {
    status: string;
    message?: string;
    data: Booking[];
}

export interface Booking {
    id: number;
    booking_id: string;
    booked_by_id: number;
    booked_by_name: string;
    booked_by_email: string;
    booked_by_role: string;

    user_name: string;
    user_email: string;
    user_phone: string;
    user_role: string;

    listing_id: string;

    payment_method: string;

    product_title: string;
    product_image: string;
    category: string;
    product_address: string;

    check_in: string;
    check_out: string;

    adults: number;
    children: number;

    total_amount: number;
    currency: string;

    card_last4?: string;
    card_expiration?: string;

    terms_accepted: boolean;

    created_at: string;
    updated_at: string;
}
