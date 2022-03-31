from setuptools import setup, find_packages

requires = [
    'Flask==2.1.1',
    'Authlib==0.14.3',
    'pyquery==1.4.3',
    'cairosvg==2.1.3',
    'requests==2.25.1'
]

setup(
    name='markote',
    version='0.0.1',
    description='Save markdown notes to onenote.',
    url='https://github.com/Frederick-S/markote',
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    install_requires=requires,
    test_suite="tests"
)
