# Generated by Django 4.2.1 on 2023-05-09 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_open', models.DateField(blank=True, null=True)),
                ('date_pay', models.DateField(blank=True, null=True)),
                ('date_close', models.DateField(blank=True, null=True)),
                ('status', models.CharField(blank=True, max_length=30, null=True)),
            ],
            options={
                'db_table': 'booking',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('img', models.CharField(max_length=1000)),
                ('price', models.FloatField()),
                ('number', models.IntegerField()),
            ],
            options={
                'db_table': 'service',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(max_length=30)),
                ('pass_field', models.CharField(db_column='pass', max_length=30)),
                ('username', models.CharField(blank=True, max_length=150, unique=True)),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
    ]
