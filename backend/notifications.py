from smtplib import SMTP
from email.mime.text import MIMEText
from sqlalchemy.orm import Session
from models import Notification
from datetime import datetime
import os

def send_email(subject, recipient, body):
    """
    Sends an email to the specified recipient.
    """
    smtp_server = os.getenv('SMTP_SERVER')
    smtp_port = int(os.getenv('SMTP_PORT', '587'))
    smtp_user = os.getenv('SMTP_USER')
    smtp_password = os.getenv('SMTP_PASSWORD')

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = smtp_user
    msg['To'] = recipient

    with SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)


def notify_user_via_email(db: Session, user_id, user_email, subject, message):
    """
    Sends an email to the user and records the notification in the database.
    """
    # send email
    send_email(subject, user_email, message)

    # record in DB
    notif = Notification(
        user_id=user_id,
        message=message,
        sent_at=datetime.utcnow(),
        channel='email'
    )
    db.add(notif)
    db.commit()
