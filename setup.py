from setuptools import setup, find_packages

requires = [
    'Flask==1.0.2',
    'Flask-Script==2.0.6',
    'Authlib==0.7',
    'Flask-Login==0.4.1'
]

setup(
    name='onemark',
    version='0.0.1',
    description='Save markdown notes to onenote.',
    url='https://github.com/Frederick-S/onemark',
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    install_requires=requires,
    test_suite="tests"
)
