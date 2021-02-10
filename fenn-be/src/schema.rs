table! {
    poll_options (id) {
        id -> Int4,
        poll_id -> Int4,
        name -> Varchar,
    }
}

table! {
    polls (id) {
        id -> Int4,
        title -> Varchar,
        created_at -> Timestamp,
    }
}

joinable!(poll_options -> polls (poll_id));

allow_tables_to_appear_in_same_query!(
    poll_options,
    polls,
);
